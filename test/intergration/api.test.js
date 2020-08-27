import chai from "chai";
import chaiHttp from "chai-http";
import server from "../../index";
import nock from "nock";

import { getCompaniesData, createCompanyMock } from "./mockData";

chai.use(chaiHttp);
const expect = chai.expect;

describe("API Routes", function () {
  describe("/GET api route", async function () {
    nock("http://127.0.0.1:3000")
      .get("/api/v1/list-companies")
      .reply(200, getCompaniesData);

    it("should get all companies", async () => {
      const response = await chai.request(server).get("/api/v1/list-companies");
      const { body, status } = response;

      // status should be 200
      expect(status).to.equal(200);

      // check to see if each compaany has required properties
      body.forEach((company) => {
        expect(company).to.have.property("id");
        expect(company).to.have.property("name");
        expect(company).to.have.property("location");
        expect(company).to.have.property("employees");
        expect(company).to.have.property("networth");
        expect(company).to.have.property("added_date");
        expect(company).to.have.property("modified_date");
      });
    });
  });

  describe("/POST api route", async function () {
    nock("http://127.0.0.1:3000")
      .post("/api/v1/create-company")
      .reply(201, { hello: "jhhb" });

    it("should create a company", async () => {
      const response = await chai
        .request(server)
        .post("/api/v1/create-company");

      const { body, status } = response;

      // status should be 200
      expect(status).to.equal(201);
      console.log(body);
    });
  });
});
