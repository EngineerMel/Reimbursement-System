import { HttpError } from "./HttpError";

export class TokenError extends HttpError {
  constructor() {
    super("token has expired", 401);
  }
}
