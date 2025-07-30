const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");

require("./model/User");
require("./model/Task");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/api", indexRouter);

const mongoURI =
  process.env.MONGODB_URI_PROD || "mongodb://localhost:27017/todo-list";

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((err) => {
    console.log("DB connection fail", err);
  });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("server on", PORT);
});
