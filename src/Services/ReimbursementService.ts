import { ReimbursementDTO } from "../DTOs/ReimbursementDTO";
import { Reimbursement } from "../Models/Reimbursement";
//add to more dao's
import { daoSubmitReimbursement } from "../repositories/Reimbursement-Dao";

export async function submitReimbursement(
  newReimbursement: ReimbursementDTO
): Promise<Reimbursement> {
  return daoSubmitReimbursement(newReimbursement);
}
