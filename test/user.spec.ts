// import chai from "chai";
// import chaiHttp from "chai-http";

// import app from "../src/index";

// let should = chai.should();

// chai.use(chaiHttp);

// let t_user = {
//   email: "tester@phantom.com",
//   password: "w6vav7",
// };

// describe("POST /api/users", () => {
//   it("should sign in user", (done) => {
//     chai
//       .request(app)
//       .post("/api/auth/signin")
//       .send(t_user)
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.be.a("object");
//         res.body.should.have.property("accessToken");
//         done();
//       });
//   });
// });
