import { HttpError } from "./HttpError";

export class DeniedReimbursement extends HttpError {
  constructor() {
    super("Reimbursement Denied", 404);
  }
}
