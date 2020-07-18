import db from "../db";
import moment from "moment";

const companiesController = {
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
};

export default companiesController;