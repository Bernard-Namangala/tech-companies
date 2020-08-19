import chai from "chai";
import chaiHttp from "chai-http";
import { getCompaniesData, createCompanyData } from "./mockData";
import nock from "nock";
import server from "../index";
chai.use(chaiHttp);
const expect = chai.expect;

after(() => {
  server.close();
});

describe("test api routes", () => {
  it("returns all companies", (done) => {
    nock("http://127.0.0.1:3000")
      .get("/api/v1/list-companies")
      .reply(200, getCompaniesData);

    chai
      .request(server)
      .get("/api/v1/list-companies")
      .end((err, res) => {
        const { status, body } = res;
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

        // check if all companies are recieved
        expect(body).to.have.length(3);

        // check that body is of the correct data type
        expect(body).to.be.an("array");
      });
    done();
  });

  it("creates company with passed parameters", (done) => {
    nock("http://127.0.0.1:3000")
      .post("/api/v1/create-company")
      .reply(201, createCompanyData);

    chai
      .request(server)
      .post("/api/v1/create-company")
      .send(createCompanyData)
      .end((err, res) => {
        const { status, body } = res;

        // check if status is 200
        expect(status).to.equal(201);

        // check if length of body is 1
        expect(body).to.be.an("Object");

        // check if the object has all required properties
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
