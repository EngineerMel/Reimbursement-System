import * as express from "express";
import { ReimbursementDTO } from "../DTOs/ReimbursementDTO";
import { authFactory } from "../Middleware/auth.middleware";
import {
  submitReimbursement,
  findReimbursementByStatus,
  updateReimbursement,
  findReimbursementByAuthor
} from "../Services/ReimbursementService";

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

//find reimbursement by user
reimbursementRouter.get(
  "/author/userId/:user_id",
  authFactory(["Finance-Manager", "Admin", "User"]),
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

//find reimbursement by status
reimbursementRouter.get(
  "/status/:status_id",
  authFactory(["Finance-Manager"]),
  async (req, res) => {
    try {
      const { status_id } = req.body;
      if (!isNaN(status_id)) {
        const reimbursement = await findReimbursementByStatus(status_id);
        res.status(200).json(reimbursement);
      } else {
        res.status(400).send("Please submit a valid Id");
      }
    } catch (e) {
      res.status(e.status).send(e.message);
    }
  }
);

reimbursementRouter.patch("/users", async (req, res) => {
  const {
    reimbursement_id,
    author,
    amount,
    dateSubmitted,
    dateResolved,
    description,
    resolver,
    status,
    type
  } = req.body;
  try {
    if (!req.body) {
      throw new Error("Please include all fields.");
    } else {
      const reimbursement = await updateReimbursement(
        new ReimbursementDTO(
          reimbursement_id,
          author,
          amount,
          dateSubmitted,
          dateResolved,
          description,
          resolver,
          status,
          type
        )
      );
      res.status(201).json(reimbursement);
    }
  } catch (e) {
    res.status(e.status).send(e.message);
  }
});
