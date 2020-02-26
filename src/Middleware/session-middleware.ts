import * as session from "express-session";

const sessionConfig = {
  secret: "false",
  cookie: { secure: false },
  resave: false,
  saveUninitialized: false
};

export const sessionMiddleware = session(sessionConfig);
