import { Reimbursement } from "../Models/Reimbursement";
import { ReimbursementDTO } from "../DTOs/ReimbursementDTO";
import { reimbursementDTOToReimbursement } from "../Utils/reimbursement-to-reimbursementdto";
import { InternalServerError } from "../Errors/InternalServerError";
import { DeniedReimbursement } from "../Errors/DeniedReimbursement";
import { PoolClient } from "pg";
import { connectionPool } from ".";

//submit reimbursement
export async function daoSubmitReimbursement(
  newReimbursement: ReimbursementDTO
): Promise<Reimbursement> {
  let client: PoolClient;
  try {
    client = await connectionPool.connect();
    let reimbursement = await client.query(
      `INSERT INTO public.reimbursement
        (author, amount, dateSubmitted, dateResolved, description, resolver, status, "type")
        VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING reimbursement_id;`,
      [
        newReimbursement.author,
        newReimbursement.amount,
        newReimbursement.dateSubmitted,
        newReimbursement.dateResolved,
        newReimbursement.description,
        newReimbursement.resolver,
        newReimbursement.status,
        newReimbursement.type
      ]
    );

    let result = await client.query(
      `SELECT * FROM public.reimbursement WHERE "reimbursement_id = $1;`,
      [reimbursement.rows[0].reimbursement_id]
    );
    return reimbursementDTOToReimbursement(result.rows[0]);
  } catch (e) {
    console.log(e);
    throw new InternalServerError();
  } finally {
    client && client.release;
  }
}
