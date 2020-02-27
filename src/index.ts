import * as express from "express";
import * as bodyparser from "body-parser";
import { userRouter } from "./Routers/UserRouter";

const app = express();
app.use("/", bodyparser.json());
app.use("/users", userRouter);

//shows what port the application runs on
const port = process.env.PORT || 2020;
app.listen(port, () => console.log(`Listening on ${port}`));
