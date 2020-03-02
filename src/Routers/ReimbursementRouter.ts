import * as express from "express";
import { ReimbursementDTO } from "../DTOs/ReimbursementDTO";
import { authFactory } from "../Middleware/auth.middleware";
import {
  submitReimbursement,
  findReimbursementByStatus,
  updateReimbursement,
  findReimbursementByAuthor
} from "../Services/ReimbursementService";
import { DeniedReimbursement } from "../Errors/DeniedReimbursement";
import { BadCredentialsError } from "../Errors/BadCredentialsError";

export const reimbursementRouter = express.Router();

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

//find reimbursement by author
reimbursementRouter.get(
  "/author/userId/:user_id",
  authFactory(["Finance-Manager"]),
  async (req, res) => {
    const { user_id } = req.body;
    try {
      if (!isNaN(user_id)) {
        const reimbursement = await findReimbursementByAuthor(user_id);
        res.status(200).json(reimbursement);
      } else {
        throw new Error("Enter a valid user id.");
      }
    } catch (e) {
      res.status(e.status).send(e.message);
    }
  }
);
