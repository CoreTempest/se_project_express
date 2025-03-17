const express = require("express");
const { errors } = require("celebrate");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const indexRouter = require("./routes/index");
const errorHandler = require("./middleware/error-handler");
const { requestLogger, errorLogger } = require("./middleware/logger");

const app = express();
const { PORT = 3001 } = process.env;

app.use(cors());

mongoose.set("strictQuery", false);

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {})
  .catch(console.error);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.use(express.json());
app.use(requestLogger);
app.use(express.static("public"));
app.use("/", indexRouter);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
