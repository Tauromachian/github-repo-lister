const express = require("express");
const logger = require("morgan");
const router = express.Router();
const axios = require("axios");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

app.use(router);

module.exports = app;
