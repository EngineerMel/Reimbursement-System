import * as express from "express";
import * as bodyparser from "body-parser";
import { userRouter } from "./Routers/UserRouter";
import { sessionMiddleware } from "./Middleware/session-middleware";
import { findUserByUsernameAndPassword } from "./Services/UserService";

const app = express();
app.use("/", bodyparser.json());
app.use(sessionMiddleware);
app.use("/users", userRouter);

app.post("/login", async (req, res) => {
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

//shows what port the application runs on
const port = process.env.PORT || 2020;
app.listen(port, () => console.log(`Listening on ${port}`));
