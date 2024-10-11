const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../index");

beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_URI).then(
    () => {
      console.log("Connection to Mongo from Jest established");
    },
    (err) => {
      console.log("Failed to connect");
    }
  );
});

afterEach(async () => {
  await mongoose.connection.close();
});
