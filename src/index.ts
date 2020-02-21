//load the express module
const express = require("express");
const app = express();

app.use(express.json());

const users = [
  { id: 1, username: "Melly", password: "test1" },
  { id: 2, username: "Melly", password: "test2" },
  { id: 3, username: "Melly", password: "test3" },
  { id: 4, username: "Melly", password: "test4" }
];

//testing endpoint
app.get("/", (req, res) => {
  res.send("Hello World");
});

//List all users
app.get("/api/users", (req, res) => {
  res.send([users]);
});

//creates a user
app.post("/api/users", (req, res) => {
  const user = {
    id: users.length + 1,
    username: req.body.username,
    password: req.body.password
  };
  users.push(user);
  res.send(user);
});

//find a user by id
app.get("/api/users/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) res.status(404).send("The user with this given id was not found");
  res.send(user);
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

//shows what port the application runs on
const port = process.env.PORT || 2020;
app.listen(port, () => console.log(`Listening on ${port}`));