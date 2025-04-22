const express = require("express");
const cors = require("cors");
const session = require("cookie-session");
const router = require("./view/router");
const passport = require("passport");
require("./utils/passport.config");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(
  session({
    name: "session",
    keys: [process.env.GOOGLE_API_KEY],
    maxAge: 24 * 60 * 60 * 1000,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/", router);

module.exports = app;
