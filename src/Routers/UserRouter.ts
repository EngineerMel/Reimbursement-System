import * as express from "express";
import { sessionMiddleware } from "../middleware/session-middleware";
import { TokenError } from "../Errors/TokenError";

import {
  authAdminMiddleware,
  authUserMiddleware,
  authFactory,
  authCheckId
} from "../Middleware/auth.middleware";

import {
  findAllUsers,
  saveOneUser,
  findUserById,
  updateUser,
  findUserByUsernameAndPassword
} from "../Services/UserService";

import { UserDTO } from "../DTOs/UserDTO";
import { Role } from "../Models/Role";

export const userRouter = express.Router();
userRouter.use(sessionMiddleware);

//LOGIN USER
userRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send("Please include a valid username and password");
  } else {
    try {
      let user = await findUserByUsernameAndPassword(username, password);

      req.session.user = user;
      res.status(200).json(user);
    } catch (error) {
      res.status(error.status).send(error.message);
    }
  }
});

//GET ALL USERS

userRouter.get("", authFactory(["Finance-Manager"]), async (req, res) => {
  if (req.session.user) {
    try {
      if (req.session.user.role.role_id > 2) {
      } else {
        const users = await findAllUsers();
        res.status(200).json(users);
      }
    } catch (e) {
      //end of try
      res.status(e.status).send(e.message);
    } //end of catch
  } else {
    res.status(400).send("Please log in.");
  }
});

// generally in rest convention
// a post request to the root of a resource will make one new of that resource
userRouter.post("/:id", authFactory(["Finance-Manager"]), async (req, res) => {
  let {
    user_id,
    username,
    password,
    firstName,
    lastName,
    email,
    role
  }: {
    user_id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
  } = req.body; // this will be where the data the sent me is
  // the downside is this is by default just a string of json, not a js object
  if (
    user_id &&
    username &&
    password &&
    firstName &&
    lastName &&
    email &&
    role
  ) {
    let newUser = await saveOneUser(
      new UserDTO(user_id, username, password, firstName, lastName, email, role)
    );
    // this would be some function for adding a new user to a db
    res.status(201).json(newUser);
  } else {
    res.status(400).send("Please include all user fields");
    // for setting a status and a body
  }
});

userRouter.get("/:id", authFactory(["Finance-Manager"]), async (req, res) => {
  const id = +req.params.id;
  if (isNaN(id)) {
    res.sendStatus(400);
  } else {
    try {
      let user = await findUserById(id);
      res.json(user);
    } catch (e) {
      res.status(e.status).send(e.message);
    }
  }
});

userRouter.patch("", [
  authFactory(["Admin"]),
  async (req, res) => {
    let {
      user_id,
      username,
      firstName,
      lastName,
      email,
      role
    }: {
      user_id: number;
      username: string;
      firstName: string;
      lastName: string;
      email: string;
      role: Role;
    } = req.body;
    if (user_id && (username || firstName || lastName || email || role)) {
    }
    try {
      let user = await updateUser(req.body);
      res.json(user);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    } finally {
      console.log("finally");
    }
  }
]);
