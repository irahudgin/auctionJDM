const Joi = require("joi");
const path = require("path");
const express = require("express");
const db = require("./utils/dbcreate");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

// initialize app
app.use(express.json());
// set static folder
app.use(express.static(__dirname + "/views"));
// pug setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Home
app.get("/", (req, res) => {
  res.render("login");
});

app.get("/auth", (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
});

app.get("/oauth-callback", (req, res) => {
  res.render("index");
});

// Start server
app.listen(port, () => console.log(`server listening port ${port}`));
