import db from "../db";
import moment from "moment";
import {
  createCompanyQuery,
  getCompanyQuery,
  updateFindOneQuery,
  updateQuery,
  deleteQuery,
} from "../queries";

const companiesController = {
  /**
   * creates a new company
   * @param {object} request
   * @param {object} response
   * @returns {object} created company
   */

  async createCompany(request, response) {
    const { name, location, employees, networth } = request.body;
    if (!name || !location || !employees || !networth) {
      // if any of the required fields aree missing inform user
      return response.status(400).send({
        error:
          "All fields are required to create a company 'name, location, number of employees and companies networth'W",
      });
    }

    const values = [
      name,
      location,
      employees,
      networth,
      moment(new Date()),
      moment(new Date()),
    ];

    try {
      const { rows } = await db.query(createCompanyQuery, values);
      return response.status(201).send(rows[0]);
    } catch (error) {
      return response.status(400).send(error);
    }
  },
  /**
   * gets a list of all companies or filters them by location if location is provided
   * @param {object} request
   * @param {object} response
   * @returns {object} list of companies
   */
  async listCompanies(request, response) {
    let query = `SELECT * FROM companies`;
    let location_filter = null;
    const { location } = request.query;

    // if user has got a location filter
    if (location !== undefined) {
      location_filter = location;
      query = "SELECT * FROM companies WHERE lower(location)=lower($1)";
    }

    if (location_filter === null) {
      // if user is not filtering by location
      try {
        const { rows, rowCount } = await db.query(query);
        return response.status(200).send({ rows, rowCount });
      } catch (error) {
        return response.status(400).send(error);
      }
    } else {
      // if user wants to filter by location
      try {
        const { rows, rowCount } = await db.query(query, [location_filter]);
        return response.status(200).send({ rows, rowCount });
      } catch (error) {
        return response.status(400).send(error);
      }
    }
  },

  /**
   * gets a company with a specific id
   * @param {object} request
   * @param {object} response
   * @returns {object} company with specific id
   */
  async getCompany(request, response) {
    try {
      const { rows } = await db.query(getCompanyQuery, [request.params.id]);
      if (!rows[0]) {
        return response.status(404).send({ error: "Company not found" });
      }
      return response.status(200).send(rows[0]);
    } catch (error) {
      return response.status(400).send(error);
    }
  },

  /**
   * Update a Companies info
   * @param {object} request
   * @param {object} response
   * @returns {object} updated company
   */
  async updateCompany(request, response) {
    const { name, location, employees, networth } = request.body;
    try {
      const { rows } = await db.query(updateFindOneQuery, [request.params.id]);
      if (!rows[0]) {
        return response.status(404).send({ error: "Company not found" });
      }

      const values = [
        name || rows[0].name,
        location || rows[0].location,
        employees || rows[0].employees,
        networth || rows[0].networth,
        moment(new Date()),
        request.params.id,
      ];
      const updated = await db.query(updateQuery, values);
      return response.status(200).send(updated.rows[0]);
    } catch (err) {
      return response.status(400).send(err);
    }
  },
  /**
   * Deletes a company with specifc id
   * @param {object} request
   * @param {object} response
   * @returns {void} return status code 204 to indicate successful deletion
   */
  async deleteCompany(request, response) {
    try {
      const { rows } = await db.query(deleteQuery, [request.params.id]);
      if (!rows[0]) {
        return response.status(404).send({ error: "company not found" });
      }
      return response
        .status(204)
        .send({ success: "company deleted successfully" });
    } catch (error) {
      return response.status(400).send(error);
    }
  },
};

export default companiesController;
