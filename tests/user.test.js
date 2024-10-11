const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../index");

beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI).then(
    () => {
      console.log("Connection to Mongo from Jest established");
    },
    (err) => {
      console.log("Failed to connect from Jets to Mongo");
    }
  );
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe("Tests for /api/users requests", () => {
  it("GET /api/users", async () => {
    const res = await request(app).get("/api/users");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBeTruthy();
    expect(res.body.data.length).toBeGreaterThan(0);
  }, 10000);

  it("POST /api/users request", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({
        username: "test4",
        password: "12345",
        name: "test4 name",
        surname: "test4 surname",
        email: "test4@aueb.gr",
        address: {
          area: "area66",
          road: "road66",
        },
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBeTruthy();
    expect(res.body.data).toBeTruthy();
  });

  it("POST /api/users request check for existed user", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({
        username: "test4",
        password: "12345",
        name: "test4 name",
        surname: "test4 surname",
        email: "test4@aueb.gr",
        address: {
          area: "area66",
          road: "road66",
        },
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBeFalsy();
  });
});
