import chai from "chai";
import chaiHttp from "chai-http";
import { getCompaniesData } from "./mockData";
import nock from "nock";
import server from "../index";
chai.use(chaiHttp);
const expect = chai.expect;

after(() => {
  server.close();
});

describe("test api routes", () => {
  nock("http://127.0.0.1:3000")
    .get("/api/v1/list-companies")
    .reply(200, getCompaniesData);

  it("test get route", (done) => {
    chai
      .request(server)
      .get("/api/v1/list-companies")
      .end((err, res) => {
        const { status, body } = res;
        expect(status).to.equal(200);

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
    done();
  });
});
