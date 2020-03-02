import * as express from "express";
import { ReimbursementDTO } from "../DTOs/ReimbursementDTO";
import { sessionMiddleware } from "../Middleware/session-middleware";
import { authFactory } from "../Middleware/auth.middleware";
import {
  submitReimbursement,
  findReimbursementByStatus,
  findByReimbursementAuthor,
  updateReimbursement
} from "../Services/ReimbursementService";

export const reimbursementRouter = express.Router();
reimbursementRouter.use(sessionMiddleware);

//SUBMIT REIMBURSEMENT
reimbursementRouter.post(
  "",
  authFactory(["Finance-Manager", "User", "Admin"]),
  async (req, res) => {
    try {
      const { amount, dateSubmitted, description, type } = req.body;
      if (amount && dateSubmitted && description && type) {
        const reimb = await submitReimbursement(
          new ReimbursementDTO(
            0,
            req.session.user.user_id,
            amount,
            dateSubmitted,
            20190101,
            description,
            null,
            2,
            type
          )
        );
        res.status(201).json(reimb);
      } else {
        throw new Error(
          "Please provide all details to submit a reimbursement request."
        );
      }
    } catch (e) {
      res.status(e.status).send(e.message);
    }
  }
);
