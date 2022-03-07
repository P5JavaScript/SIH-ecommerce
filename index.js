const express = require("express");
const app = express();
const cors = require("cors");
const { urlencoded, json } = require("body-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const http = require("http");
app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(json());
app.use("/", require("./routers/index"));

const server = http.createServer(app);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to db");
    return mongoose.connection.getClient();
  })
  .catch((e) => {
    console.log(e);
  });

server.listen(process.env.PORT || 5000, "0.0.0.0", () =>
  console.log(`Example app listening on port ${process.env.PORT || 5000}!`)
);
