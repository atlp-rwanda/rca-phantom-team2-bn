import request from "supertest"
import {createUser} from "../src/controllers/userController"
const register=createUser


describe("Register User ", ()=> {
    it("It should createUser: return  Ok", function () {
  
        request(register).get("/api/users").expect(200)
    })
})


