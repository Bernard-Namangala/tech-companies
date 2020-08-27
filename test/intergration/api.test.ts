import chai from "chai";
import chaiHttp from "chai-http";
import server from "../../index";
import db from "../../src/db";
import {
  createCompanyQuery,
  getCompanyQuery,
  listCompaniesQuery,
} from "../../src/queries";
import controllers from "../../src/controllers";
import { createCompanyData, createCompanyMock } from "./mockData";
import { async } from "regenerator-runtime";

const { companiesController } = controllers;

const { createCompany } = companiesController;

chai.use(chaiHttp);
const expect = chai.expect;

describe("/GET api route", () => {
  beforeEach(async function () {
    // remove any rows from database before testing
    await db.query("DELETE FROM companies");
  });

  after(async () => {
    server.close();
  });

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

  //   it("creates company with passed parameters", (done) => {
  //     nock("http://127.0.0.1:3000")
  //       .post("/api/v1/create-company")
  //       .reply(201, createCompanyData);

  //     chai
  //       .request(server)
  //       .post("/api/v1/create-company")
  //       .send(createCompanyData)
  //       .end((err, res) => {
  //         const { status, body } = res;

  //         // check if status is 200
  //         expect(status).to.equal(201);

  //         // check if length of body is 1
  //         expect(body).to.be.an("Object");

  //         // check if the object has all required properties
  //         expect(body).to.have.property("id");
  //         expect(body).to.have.property("name");
  //         expect(body).to.have.property("location");
  //         expect(body).to.have.property("employees");
  //         expect(body).to.have.property("networth");
  //         expect(body).to.have.property("added_date");
  //         expect(body).to.have.property("modified_date");
  //       });
  //     done();
  //   });
});

describe("/POST", function () {
  beforeEach(async function () {
    // remove any rows from database before testing
    await db.query("DELETE FROM companies");
  });

  after(async () => {
    server.close();
  });

  it("inserts a company into the db", function (done) {
    chai
      .request(server)
      .post("/api/v1/create-company")
      .send(createCompanyMock)
      .end((error, res) => {
        const { body } = res;
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
});
