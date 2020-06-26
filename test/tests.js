const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = require("chai").expect;
const request = require("supertest");
const app = require("../app");
const http = require("http");
const { PORT } = require("../src/properties/application.properties");

chai.use(chaiHttp);

let userToken = "";


describe("Simple Unit Test", () => {
  it("GET PORT Should get port from app module", (done) => {
    const port = app.get("port");
    expect(port).equal(PORT);
    done();
  });
});

describe("Auth Test", () => {
  it("POST request /login should receive a Bearer Token", (done) => {
    request(app)
      .post("/auth/login")
      .send({ username: "Manning" })
      .expect(200)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).to.have.property("Bearer");
        userToken = `Bearer ${res.body.Bearer}`;
        done();
      });
  });
});

describe("Client Tests", () => {
  it("GET request /clients should receive a Forbidden 403 Error", (done) => {
    request(app)
      .get("/clients")
      .expect(403)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(403);
        done();
      });
  });

  it("GET request /clients/by-id should receive an user", (done) => {
    request(app)
      .get("/clients/by-id/e8fd159b-57c4-4d36-9bd7-a59ca13057bb")
      .set({ Authorization: userToken })
      .expect(200)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).to.have.property("name");
        done();
      });
  });
});

describe("Policy Tests", () => {
  it("GET request /policies should receive a Forbidden 403 Error", (done) => {
    request(app)
      .get("/policies")
      .expect(403)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(403);
        done();
      });
  });

  it("GET request /policies/by-id should receive a list of policies linked to a user", (done) => {
    request(app)
      .get("/policies/by-user/a0ece5db-cd14-4f21-812f-966633e7be86")
      .set({ Authorization: userToken })
      .expect(200)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).to.have.property("clientId");
        done();
      });
  });
});
