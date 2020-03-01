import { Reimbursement } from "../Models/Reimbursement";

export function reimbursementDTOToReimbursement(
  reimbursementDTOToReimbursement
): Reimbursement {
  return new Reimbursement(
    reimbursementDTOToReimbursement.reimbursement_id,
    reimbursementDTOToReimbursement.author,
    reimbursementDTOToReimbursement.amount,
    reimbursementDTOToReimbursement.dateSubmitted,
    reimbursementDTOToReimbursement.dateResolved,
    reimbursementDTOToReimbursement.description,
    reimbursementDTOToReimbursement.resolver,
    reimbursementDTOToReimbursement.status,
    reimbursementDTOToReimbursement.type
  );
}
