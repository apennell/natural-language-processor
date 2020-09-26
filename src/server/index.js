const path = require("path");
const express = require("express");

const app = express();

app.use(express.static("src/client"));

app.get("/", (req, res) => {
  res.sendFile("client/views/index.html", { root: `${__dirname}/..` });
});

app.listen(8080, () => {
  console.log("Listening on port 8080");
});
