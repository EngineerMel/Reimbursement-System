const express = require("express");
export const userRouter = express.Router();

const users = [
  {
    id: 1,
    username: "Melly",
    password: "test1",
    firstName: "testName",
    lastName: "testLast",
    email: "hello@me.com",
    role: "financeManager"
  },
  {
    id: 2,
    username: "Melly",
    password: "test2",
    firstName: "ramel",
    lastName: "haines",
    email: "firstema@me.com",
    role: "user"
  }
];

//List all users
userRouter.get("/", (req, res) => {
  res.send([users]);
});

//creates a user
userRouter.post("/", (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = {
    id: users.length + 1,
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    role: req.body.role
  };
  users.push(user);
  res.send(user);
});

//find a user by id
userRouter.get("/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user)
    return res.status(404).send("The user with this given id was not found");
  res.send(user);
});

//updates a user
userRouter.put("/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user)
    return res.status(404).send("The user with this given id was not found");

  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  user.username = req.body.username;
  user.password = req.body.password;
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;
  user.role = req.body.role;
  res.send(user);
});

function validateUser(user) {
  //add to schema to allow updates
  const schema = {
    username: Joi.string()
      .min(3)
      .required(),
    password: Joi.string()
      .min(5)
      .required(),
    firstName: Joi.string().min(2),
    lastName: Joi.string().min(2),
    email: Joi.string().min(5),
    role: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(user, schema);
}

module.exports = userRouter;
