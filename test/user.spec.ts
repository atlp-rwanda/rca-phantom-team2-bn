import request from "supertest";
import app from "../src/index";
import chai from "chai";
import chaiHttp from "chai-http";
import { createUser } from "../src/controllers/userController";
const register = createUser;

let agent = request.agent(app);
let should = chai.should();

chai.use(chaiHttp);

let t_user = {
  email: "tester@phantom.com",
  password: "w6vav7",
};

before((done) => {
  app.on("appStarted", () => done());
});

describe("Register User ", () => {
  it("It should createUser: return  Ok", function () {
    request(register).get("/api/users").expect(200);
  });
});

describe("Sign In", () => {
  it("should sign in user", (done) => {
    agent
      .post("/api/users/signin")
      .send(t_user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("data");
        res.body.should.have.property("message").eq("Sign in successful");
        done();
      });
  });
  it("user not found", (done) => {
    agent
      .post("/api/users/signin")
      .send({ email: "ghost@mail.com", password: "12345" })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property("message").eq("User not found");
        done();
      });
  }); 
  it("invalid password", (done) => {
    agent
      .post("/api/users/signin")
      .send({ email: "tester@phantom.com", password: "1290" })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property("message").eq("Invalid message");
        done();
      });
  });
});
