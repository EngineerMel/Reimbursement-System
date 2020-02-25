const Joi = require("joi"); //used to validate input
const userRouter = require("./Routers/userRouter");
const reimburseRouter = require("./Routers/ReimbursementRouter");
const express = require("express");
const app = express();
const authMiddleware = require("./Middleware/auth.middleware");

app.use(express.json());
app.use("/api/users", userRouter);

//shows what port the application runs on
const port = process.env.PORT || 2020;
app.listen(port, () => console.log(`Listening on ${port}`));
