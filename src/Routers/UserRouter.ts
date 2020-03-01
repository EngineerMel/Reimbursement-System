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

// FIND A USER BY ID

userRouter.get("/:id", authFactory(["Finance-Manager"]), async (req, res) => {
  if (req.session.user) {
    const { user_id } = req.body;
    if (isNaN(user_id)) {
      res.status(400).send("Invalid Id.");
    } else {
      try {
        if (
          req.session.user.role.role_id <= 2 ||
          user_id === req.session.user.user_id
        ) {
          const user = await findUserById(user_id);
          res.status(200).json(user);
        }
      } catch (e) {
        res.status(e.status).send(e.message);
      }
    }
  } else {
    res.status(400).send("Please log in");
  }
});

//UPDATE A USER

userRouter.patch("/update", authFactory(["Admin"]), async (req, res) => {
  if (req.session.user) {
    try {
      if (req.session.user.role.role_id === 1) {
        const {
          user_id,
          username,
          password,
          firstName,
          lastName,
          email,
          role
        } = req.body;
        if (findUserById(user_id)) {
          let user = await updateUser(
            new UserDTO(
              user_id,
              username,
              password,
              firstName,
              lastName,
              email,
              role
            )
          );
          res.status(200).json(user);
        } else {
          res.status(400).send("Invalid Credentials. Please enter valid Id.");
        }
      }
    } catch (e) {
      res.status(e.status).send(e.message);
    }
  } else {
    res.status(400).send("Please log in");
  }
});
