import * as session from "express-session";

const sessionConfig = {
  secret: "hidden",
  cookie: { secure: false },
  resave: false,
  saveUninitialized: false
};

export const sessionMiddleware = session(sessionConfig);
