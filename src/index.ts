//load the express module
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/users", (req, res) => {
  res.send([1, 2, 3]);
});

app.get("/api/users/:id", (req, res) => {
  res.send(req.params.id);
});

//below is how we add multiple parameters
// app.get("/api/users/:id/:role", (req, res) => {
//   res.send(req.params.id);
// });

/* "/api/users/:id?sortBy=name" <<<this is how the endpoint would look for query string 
paramter which is used to provide additional data to the backend services/*

 app.get("/api/users/:id", (req, res) => {
   res.send(req.query);
 }); */

const port = process.env.PORT || 2020;
app.listen(port, () => console.log(`Listening on ${port}`));
