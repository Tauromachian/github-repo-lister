const express = require("express");
const logger = require("morgan");
const router = express.Router();
const axios = require("axios");
const cors = require("cors");

if (process.env.APP_ENV !== "production") {
  require("dotenv").config();
}

const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(router);

router.get("/", function (req, res, next) {
  const token = process.env.GITHUB_TOKEN;

  axios
    .get("https://api.github.com/users/tauromachian/repos", {
      headers: {
        authorization: `token ${token}`,
      },
    })
    .then((response) => {
      res.json(response.data);
    });
});

module.exports = app;
