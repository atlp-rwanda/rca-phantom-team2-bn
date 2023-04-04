import request from "supertest"
import app from "../src/app"
import chai from "chai"
import chaiHttp from "chai-http"
import { createUser } from "../src/controllers/userController"
const register = createUser

const agent = request.agent(app)
chai.should()
chai.use(chaiHttp)

// const tUser = {
//   email: "admin@phantom.com",
//   password: "pt6f6w",
// };

const tUser = {
    email: "alt.tp-dorml7n4@yopmail.com",
    password: "qxe6pu",
}

describe("Users tests", () => {
    it("It should create user", function() {
        request(register)
            .get("/api/users")
            .expect(200)
    })

    it("should sign in user", (done) => {
        agent
            .post("/api/users/signin")
            .send(tUser)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a("object")
                res.body.should.have.property("data")
                res.body.should.have.property("message").eq("Sign in successful")
                done()
            })
    })

    it("user not found", (done) => {
        agent
            .post("/api/users/signin")
            .send({ email: "ghost@mail.com", password: "12345" })
            .end((err, res) => {
                res.should.have.status(404)
                res.body.should.have.property("message").eq("User not found")
                done()
            })
    })

    it("invalid password", (done) => {
        agent
            .post("/api/users/signin")
            .send({ email: "alt.tp-dorml7n4@yopmail.com", password: "1290" })
            .end((err, res) => {
                res.should.have.status(401)
                res.body.should.have.property("message").eq("Invalid message")
                done()
            })
    })
})
