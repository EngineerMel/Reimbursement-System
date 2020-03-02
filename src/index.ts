import * as express from "express";
import * as bodyparser from "body-parser";
import { userRouter } from "./Routers/UserRouter";
import { reimbursementRouter } from "./Routers/ReimbursementRouter";
import { sessionMiddleware } from "./Middleware/session-middleware";

const app = express();

app.use("/", bodyparser.json());
app.use(sessionMiddleware);
app.use("/users", userRouter);
app.use("/reimbursements", reimbursementRouter);

//shows what port the application runs on
const port = process.env.PORT || 2020;
app.listen(port, () => console.log(`Listening on ${port}`));
