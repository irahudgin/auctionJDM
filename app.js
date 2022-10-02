const Joi = require("joi");
const path = require("path");
const express = require("express");
const db = require("./utils/dbcreate");
const http = require("http");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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

// after sign in on github, this page is rendered
app.get("/oauth-callback", (req, res) => {
  res.render("index");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  // req.headers["Content-Type"] = "application/json";
  console.log(JSON.stringify(req.body));
});

// Start server
app.listen(port, () => console.log(`server listening port ${port}`));
