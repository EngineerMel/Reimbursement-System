//load the express module
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/users", (req, res) => {
  res.send([1, 2, 3]);
});

const port = process.env.PORT || 2020;
app.listen(port, () => console.log(`Listening on ${port}`));
