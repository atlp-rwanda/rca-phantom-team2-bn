import request from "supertest";
import app from "../src/app";
import chai from "chai";
import chaiHttp from "chai-http";
import { createUser } from "../src/controllers/userController";
import { connectDB } from "../src/db/config";
const register = createUser;

const agent = request.agent(app);
let should = chai.should();

chai.use(chaiHttp);

const tUser = {
  email: "tester@phantom.com",
  password: "x36w5n",
};

describe("Users tests", () => {
  //   before(async (done) => {
  //     await connectDB();
  //     done();
  //   });

  it("It should create user", function () {
    request(register).get("/api/users").expect(200);
  });

  it("should sign in user", (done) => {
    agent
      .post("/api/users/signin")
      .send(tUser)
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
