import db from "../db";
import moment from "moment";

const companiesController = {
  /**
   * creates a new company
   * @param {object} request
   * @param {object} response
   * @returns {object} created company
   */
  async create_company(request, response) {
    if (
      !request.body.name ||
      !request.body.location ||
      !request.body.employees ||
      !request.body.networth
    ) {
      // if any of the required fields aree missing inform user
      return response.status(400).send({
        error:
          "All fields are required to create a company 'name, location, number of employees and companies networth' ",
      });
    }

    const query = `INSERT INTO
          companies(name, location, employees, networth, added_date, modified_date)
          VALUES($1, $2, $3, $4, $5, $6)
          returning *`;
    const values = [
      request.body.name,
      request.body.location,
      request.body.employees,
      request.body.networth,
      moment(new Date()),
      moment(new Date()),
    ];

    try {
      const { rows } = await db.query(query, values);
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
  async list_companies(request, response) {
    let query = `SELECT * FROM companies`;
    let location_filter = null;

    // if user has got a location filter
    if (request.query.location !== undefined) {
      location_filter = request.query.location;
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
  async getCompany(request, reesponse) {
    const text = "SELECT * FROM companies WHERE id = $1";
    try {
      const { rows } = await db.query(text, [request.params.id]);
      if (!rows[0]) {
        return reesponse.status(404).send({ error: "Company not found" });
      }
      return reesponse.status(200).send(rows[0]);
    } catch (error) {
      return reesponse.status(400).send(error);
    }
  },

  /**
   * Update a Companies info
   * @param {object} request
   * @param {object} response
   * @returns {object} updated company
   */
  async update_company(request, response) {
    const findOneQuery = "SELECT * FROM companies WHERE id=$1";
    const updateOneQuery = `UPDATE companies
      SET name=$1,location=$2,employees=$3,networth=$4,modified_date=$5
      WHERE id=$6 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [request.params.id]);
      if (!rows[0]) {
        return res.status(404).send({ error: "Company not found" });
      }
      const values = [
        request.body.name || rows[0].name,
        request.location || rows[0].location,
        request.body.employees || rows[0].employees,
        request.body.networth || rows[0].networth,
        moment(new Date()),
        request.params.id,
      ];
      const updated = await db.query(updateOneQuery, values);
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
  async delete_company(request, response) {
    const deleteQuery = "DELETE FROM companies WHERE id=$1 returning *";
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
