const Joi = require("joi");
const path = require("path");
const express = require("express");
const app = express();

app.use(express.json());

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.listen(port, () => console.log(`server listening port ${port}`));
