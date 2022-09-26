const Joi = require("joi");
const path = require("path");
const express = require("express");
const db = require("./utils/dbcreate");
const app = express();

// initialize app
app.use(express.json());
app.use(express.static(__dirname + "/views"));
const port = process.env.PORT || 5000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Home
app.get("/", (req, res) => {
  res.render("index");
});

// Start server
app.listen(port, () => console.log(`server listening port ${port}`));
