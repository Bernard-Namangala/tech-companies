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
      return res.status(400).send({ message: "All fields are required" });
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
};

export default companiesController;
