const Joi = require("joi");
const path = require("path");
const express = require("express");
const http = require("http");
const app = express();
const bcrypt = require("bcrypt");
const sqlite3 = require("sqlite3").verbose();
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
  const username = req.body.username;
  const password = req.body.password;
  const confirmation = req.body.confirmation;

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

  // compare username entered by client with database usernames to see if theres a match
  //
  auctionHelp
    .selectAll(`SELECT username FROM users WHERE username="${username}"`)
    .then((user) => {
      console.log(user);
      if (!user[0]) {
        return res.redirect("/");
      } else if (user[0].username === username) {
        return res.render("apology", {
          message: "Username already exists",
          code: 400,
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });

  // if a match exists return res.render(apology)

  // generate salt to hash password
  // const salt = await bcrypt.genSalt(10);
  // now we set user password to hashed password
  // const passwordHash = await bcrypt.hash(password, salt);
  // add a checkusr alreadry exists statement here later
  // db.db.run(sql, [username, passwordHash]);
});

// Start server
app.listen(port, () => console.log(`server listening port ${port}`));
