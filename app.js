const express = require("express");

const app = express();
app.use(express.json());
const { PORT = 3001 } = process.env;
