const Joi = require("joi");
const path = require("path");
const express = require("express");
const db = require("./utils/dbcreate");
const http = require("http");
const app = express();
const bcrypt = require("bcrypt");
require("dotenv").config();
const port = process.env.PORT || 5000;
const auctionHelp = require("./utils/helpers");

// for parsing body of form request
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
  console.log(req.body.username);
  let saltRounds = 10;
  let username = req.body.username;
  let password = req.body.password;
  let confirmation = req.body.confirmation;

  if (username === "") {
    return res.render("apology", {
      message: "Must include username",
      code: 400,
    });
  } else if (password === "") {
    return res.render("apology", {
      message: "Must include password",
      code: 400,
    });
  } else if (!(password === confirmation)) {
    return res.render("apology", {
      message: "Passwords must match",
      code: 400,
    });
  }
  // else if (password == "") {
  //   return apology("Must enter password");
  // } else if (!(password === confirmation)) {
  //   return apology("Passwords do not match");
  // }
  res.redirect("/");
});

// Start server
app.listen(port, () => console.log(`server listening port ${port}`));
