const express = require("express");
const app = express();
// const port = 3000;

const mongoose = require("mongoose");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger");
const cors = require("cors");

app.use(
  cors({
    origin: ["http://localhost:8000"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", express.static("files"));

mongoose.connect(process.env.MONGODB_URI).then(
  () => {
    console.log("Connection to MongoDB established");
  },
  (err) => {
    console.group("Failed to connect");
  }
);

const user = require("./routes/user.routes");
const userProduct = require("./routes/user.product.routes");

app.use("/api/users", user);
// app.use('/api/products', product)
app.use("/api/user-product", userProduct);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument.options));

module.exports = app;
