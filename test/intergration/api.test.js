import chai from "chai";
import chaiHttp from "chai-http";
import server from "../../index";
import db from "../../src/db";
import {
  createCompanyQuery,
  getCompanyQuery,
  listCompaniesQuery,
  createTableQuery,
} from "../../src/queries";
import controllers from "../../src/controllers";
import { createCompanyData, createCompanyMock } from "./mockData";
import { async } from "regenerator-runtime";

const { companiesController } = controllers;

const { createCompany } = companiesController;

chai.use(chaiHttp);
const expect = chai.expect;

describe("API routes", function () {
  before(async () => {
    // create database tables if they dont exist
    await db.query(createTableQuery);
  });

  beforeEach(async function () {
    // remove any rows from database before testing
    await db.query("DELETE FROM companies");
  });

  this.afterAll(async () => {
    server.close();
  });

  describe("GET companies api route", () => {
    it("returns all companies", async () => {
      // insert our test data
      await db.query(createCompanyQuery, createCompanyData);
      chai
        .request(server)
        .get("/api/v1/list-companies")
        .end((err, res) => {
          const { status, body } = res;
          const { companies } = body;
          // status should be 200
          expect(status).to.equal(200);

          // check to see if each compaany has required properties
          companies.forEach((company) => {
            expect(company).to.have.property("id");
            expect(company).to.have.property("name");
            expect(company).to.have.property("location");
            expect(company).to.have.property("employees");
            expect(company).to.have.property("networth");
            expect(company).to.have.property("added_date");
            expect(company).to.have.property("modified_date");
          });

          //check if all companies are recieved
          expect(companies).to.have.length(1);

          // check that body is of the correct data type
          expect(companies).to.be.an("array");
        });
      // done();
    });

    it("returns no companies if we dont add any", (done) => {
      chai
        .request(server)
        .get("/api/v1/list-companies")
        .end((err, res) => {
          const { status, body } = res;
          const { companies } = body;
          // status should be 200
          expect(status).to.equal(200);

          //check if all companies are recieved
          expect(companies).to.have.length(0);

          // check that body is of the correct data type
          expect(companies).to.be.an("array");
        });

      done();
    });
  });

  describe("Get company api route", function () {
    it("gets company with specified id", async function () {
      // create company to delete
      const { rows, rowCount } = await db.query(
        createCompanyQuery,
        createCompanyData
      );
      const companyId = rows[0].id;

      await chai
        .request(server)
        .get(`/api/v1/get-company/${companyId}`)
        .then((res) => {
          const { status, body } = res;
          expect(status).to.equal(200);
          expect(body).to.equal(createCompanyMock);
        })
        .catch((error) => error);
    });

    it("returns error 404 if company with specified it isnt in database", async function () {
      await chai
        .request(server)
        .put(`/api/v1/get-company/0`)
        .then((res) => {
          const { status, body } = res;
          expect(status).to.equal(404);
          expect(body).to.be.empty();
        })
        .catch((error) => error);
    });
  });

  describe("CREATE company api route", function () {
    it("inserts a company into the db", function (done) {
      chai
        .request(server)
        .post("/api/v1/create-company")
        .send(createCompanyMock)
        .end((error, res) => {
          const { body, status } = res;
          expect(status).to.equal(201);
          expect(body).to.be.an("object");
          expect(res.error).to.equal(false);

          expect(body).to.have.property("id");
          expect(body).to.have.property("name");
          expect(body).to.have.property("location");
          expect(body).to.have.property("employees");
          expect(body).to.have.property("networth");
          expect(body).to.have.property("added_date");
          expect(body).to.have.property("modified_date");
        });
      done();
    });

    it("returns an error if all information isn't provided", function (done) {
      chai
        .request(server)
        .post("/api/v1/create-company")
        .end((err, res) => {
          if (error) return done(error);
          const { body, error, status } = res;
          expect(error.text).to.not.equal(null);
          expect(body).to.have.property("error");
          expect(status).to.equal(400);
        });
      done();
    });
  });

  describe("DELETE commpany api route", function () {
    it("deletes company with specifield id", async function () {
      // create company to delete
      const { rows, rowCount } = await db.query(
        createCompanyQuery,
        createCompanyData
      );
      const companyId = rows[0].id;

      await chai
        .request(server)
        .delete(`/api/v1/delete-company/${companyId}`)
        .then((res) => {
          const { body, status } = res;
          expect(status).to.equal(204);
          expect(body).to.be.empty();
        })
        .catch((err) => {
          return err;
        });
    });
    it("returns 404 error if no company with specified id is found", async function () {
      await chai
        .request(server)
        .delete(`/api/v1/delete-company/0`)
        .then((res) => {
          const { error, status, body } = res;
          expect(status).to.equal(204);
          expect(error).to.not.be.empty();
          expect(body).to.have.property("error");
        })
        .catch((error) => error);
    });
  });

  describe("UPDATE company api route", function () {
    it("updates company with specified id", async function () {
      // create company to delete
      const { rows, rowCount } = await db.query(
        createCompanyQuery,
        createCompanyData
      );
      const companyId = rows[0].id;

      await chai
        .request(server)
        .put(`/api/v1/update-company/${companyId}`)
        .send({ name: "updated" })
        .then((res) => {
          const { status, body } = res;
          expect(body.name).to.equal("updated");
          expect(status).to.equal(200);
        })
        .catch((error) => error);
    });

    it("returns error 404 if company with specified it isnt in databse", async function () {
      await chai
        .request(server)
        .put(`/api/v1/update-company/0`)
        .then((res) => {
          const { status, body } = res;
          expect(status).to.equal(404);
          expect(body).to.be.empty();
        })
        .catch((error) => error);
    });
  });
});
