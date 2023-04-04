import request from "supertest"
import app from "../src/app"
import chai, { expect } from "chai"
import chaiHttp from "chai-http"

const agent = request.agent(app)
chai.should()
chai.use(chaiHttp)

const getHeaders = ()=> ({
    "Authorization": `Bearer ${1}`,
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Accept-Language": "en"
})

describe("Buses Tests", ()=> {
    // let token: string
    // it("Should GET all buses", (done)=> {
    //     agent
    //         .get("/api/buses")
    //         .set(getHeaders())
    //         .end((err, res)=> {
    //             expect(res.statusCode).to.be.equal(200)
    //             done()
    //         })
    // })
})