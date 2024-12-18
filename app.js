const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const indexRouter = require("./routes/index");

const app = express();
const { PORT = 3001 } = process.env;

app.use(cors());

mongoose.set("strictQuery", false);

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {})
  .catch(console.error);

app.use(express.json());

app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
