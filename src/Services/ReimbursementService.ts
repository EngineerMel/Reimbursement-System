import { ReimbursementDTO } from "../DTOs/ReimbursementDTO";
import { Reimbursement } from "../Models/Reimbursement";
//add to more dao's
import {
  daoSubmitReimbursement,
  daoFindByReimbursementStatus,
  daoFindReimbursementByAuthor,
  daoUpdateReimbursement
} from "../repositories/Reimbursement-Dao";

export async function submitReimbursement(
  newReimbursement: ReimbursementDTO
): Promise<Reimbursement> {
  return daoSubmitReimbursement(newReimbursement);
}

export async function findReimbursementByStatus(
  status: number
): Promise<Reimbursement[]> {
  return daoFindByReimbursementStatus(status);
}

export async function findByReimbursementAuthor(
  user_id: number
): Promise<Reimbursement[]> {
  return daoFindReimbursementByAuthor(user_id);
}

export async function updateReimbursement(
  reimbursement: ReimbursementDTO
): Promise<Reimbursement> {
  return daoUpdateReimbursement(reimbursement);
}
