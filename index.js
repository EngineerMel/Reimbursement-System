//load the express module
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/users", (req, res) => {
  res.send([1, 2, 3]);
});

app.listen(2020, () => console.log("Listening on port 2020"));
