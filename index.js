require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const logger = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger(':method :status :url "HTTP/http-version"'));
app.use(require("./routes"));

app.use("/public", express.static(path.resolve(__dirname, "public")));

app.get("/", (req, res) => {
  res.end("Morgan Logger App");
});

mongoose.connect(process.env.MONGODV_SERVER).then(() => {
  app.listen(process.env.PORT, () =>
    console.log(`Server has been started, http://localhost:${process.env.PORT}`)
  );
});
