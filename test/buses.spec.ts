import request from "supertest"
import app from "../src/app"
import chai, { expect } from "chai"
import chaiHttp from "chai-http"
import { random } from "lodash"

const agent = request.agent(app)
chai.should()
chai.use(chaiHttp)

const admin = {
    email: "admin@phantom.com",
    password: "pt6f6w"
}

describe("Buses Tests", ()=> {
    let token: string
    let busId: string

    it("Should sign in as admin", async function() {
        const res = await agent.post("/api/users/signin").send(admin)
        expect(res.statusCode, "Should return 200: OK status").to.be.equal(200)
        token = res.body.data?.accessToken
    })

    it("Should create a bus", async function() {
        const res = await agent.post("/api/buses").set({"Authorization": `Bearer ${token}`}).send({
            type: "Shuttle bus",
            plateNumber: `RAC${random(1000,2000)}`,
            regNumber: `RAC${random(3000,4000)}`,
            model: "Yutong U12",
            manufacturer: "Yutong"
        })
        expect(res.statusCode, "Should return 201: CREATED").to.be.equal(201)
        busId = res.body.data?.id
    })

    it("Should update bus by ID", async function(){
        const res = await agent.put(`/api/buses/${busId}`).set({"Authorization": `Bearer ${token}`}).send({
            type: "Shuttle bus",
            plateNumber: `RAC${random(1000,2000)}`,
            regNumber: `RAC${random(3000,4000)}`,
            model: "Yutong U12",
            manufacturer: "Yutong"
        })
        expect(res.statusCode, "Should return 200: OK").to.be.equal(200)
    })

    it("Should get a bus by ID", async function(){
        const res = await agent.get(`/api/buses/bus/${busId}`).set({"Authorization": `Bearer ${token}`}).send()
        expect(res.statusCode, "Should return 200: OK").to.be.equal(200)
        res.body.should.be.a("object")
        res.body.should.have.property("data")
    })

    it("Should delete a bus by ID", async function(){
        const res = await agent.delete(`/api/buses/${busId}`).set({"Authorization": `Bearer ${token}`}).send()
        expect(res.statusCode, "Should return 200: OK").to.be.equal(200)
    })

    it("Bus should not be found", async function(){
        const res = await agent.get(`/api/buses/bus/${busId}`).set({"Authorization": `Bearer ${token}`}).send()
        expect(res.statusCode, "Should return 404: OK").to.be.equal(404)
    })

    it("Should GET all buses", async function() {
        const res = await agent.get("/api/buses").set({"Authorization": `Bearer ${token}`}).send()
        expect(res.statusCode, "Should return 200: OK").to.be.equal(200)
    })
})