import * as express from "express";
import { UserDTO } from "../DTOs/UserDTO";
import { authFactory } from "../Middleware/auth.middleware";
import {
  findAllUsers,
  findUserById,
  updateUser,
  findUserByUsernameAndPassword
} from "../Services/UserService";

export const userRouter = express.Router();

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
      const users = await findAllUsers();
      res.status(200).json(users);
    } catch (e) {
      //end of try
      res.status(e.status).send(e.message);
    } //end of catch
  } else {
    res.status(400).send("Please log in.");
  }
});

// FIND A USER BY ID

userRouter.get(
  "/:user_id",
  authFactory(["Finance-Manager"]),
  async (req, res) => {
    if (req.session.user) {
      const user_id = +req.params.user_id;
      if (isNaN(user_id)) {
        res.status(400).send("Invalid Id.");
      } else {
        try {
          const user = await findUserById(user_id);
          res.status(200).json(user);
        } catch (e) {
          res.status(e.status).send(e.message);
        }
      }
    } else {
      res.status(400).send("Please log in");
    }
  }
);

//UPDATE A USER

userRouter.patch("/update", authFactory(["Admin"]), async (req, res) => {
  if (req.session.user) {
    try {
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
    } catch (e) {
      res.status(e.status).send(e.message);
    }
  } else {
    res.status(400).send("Please log in");
  }
});
