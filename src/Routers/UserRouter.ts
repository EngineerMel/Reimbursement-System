import * as express from "express";
import { User } from "../Models/User";
import {
  authAdminMiddleware,
  authUserMiddleware,
  authFactory,
  authCheckId
} from "../Middleware/auth.middleware";
import {
  findAllUsers,
  saveOneUser,
  findUserById
} from "../Services/UserService";
import { UserDTO } from "../DTOs/UserDTO";

export const userRouter = express.Router();

//List all users
userRouter.get("/", [
  authFactory(["Admin"]),
  async (req, res) => {
    let users: User[] = await findAllUsers();
    res.json(users);
  }
]);

// generally in rest convention
// a post request to the root of a resource will make one new of that resource
userRouter.post("", authFactory(["Admin"]), async (req, res) => {
  let {
    username,
    password,
    emailAddress,
    id,
    firstName,
    lastName,
    role
  }: {
    username: string;
    password: string;
    emailAddress: string;
    id: number;
    firstName: string;
    lastName: string;
    role: string;
  } = req.body; // this will be where the data the sent me is
  // the downside is this is by default just a string of json, not a js object
  if (
    username &&
    password &&
    emailAddress &&
    id &&
    firstName &&
    lastName &&
    role
  ) {
    let newUser = await saveOneUser(
      new UserDTO(
        username,
        password,
        emailAddress,
        0,
        firstName,
        lastName,
        role,
        role
      )
    );
    // this would be some function for adding a new user to a db
    res.status(201).json(newUser);
  } else {
    res.status(400).send("Please include all user fields");
    // for setting a status and a body
  }
});

userRouter.get(
  "/:id",
  authFactory(["Admin", "User"]),
  authCheckId,
  async (req, res) => {
    const id = +req.params.id; // the plus sign is to type coerce into a number
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
  }
);
