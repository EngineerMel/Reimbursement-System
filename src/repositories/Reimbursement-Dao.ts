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
        (author, amount, dateSubmitted, dateResolved, description, status, "type")
        VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING reimbursement_id;`,
      [
        newReimbursement.author,
        newReimbursement.amount,
        newReimbursement.dateSubmitted,
        newReimbursement.dateResolved,
        newReimbursement.description,
        newReimbursement.status,
        newReimbursement.type
      ]
    );

    let result = await client.query(
      `SELECT * FROM public.reimbursement WHERE reimbursement_id = $1;`,
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

export async function daoFindByReimbursementStatus(
  status: number
): Promise<Reimbursement[]> {
  let client: PoolClient;
  try {
    client = await connectionPool.connect();
    let result = await client.query(
      `SELECT * FROM public.reimbursement WHERE status = $1;`,
      [status]
    );
    if (result.rowCount !== 0) {
      return result.rows.map(reimbursementDTOToReimbursement);
    } else {
      throw new DeniedReimbursement();
    }
  } catch (e) {
    console.log(e);
    if (e.message === "Denied Reimbursement") {
      throw new DeniedReimbursement();
    } else {
      throw new InternalServerError();
    }
  } finally {
    client && client.release;
  }
}

export async function daoFindReimbursementByAuthor(
  user_id: number
): Promise<Reimbursement[]> {
  let client: PoolClient;
  try {
    client = await connectionPool.connect();
    let result = await client.query(
      `SELECT * FROM public.reimbursement WHERE author = $1;`,
      [user_id]
    );
    if (result.rowCount !== 0) {
      return result.rows.map(reimbursementDTOToReimbursement);
    } else {
      throw new DeniedReimbursement();
    }
  } catch (e) {
    if (e.message === "Denied Reimbursement") {
      throw new DeniedReimbursement();
    } else {
      throw new InternalServerError();
    }
  } finally {
    client && client.release;
  }
}

export async function daoUpdateReimbursement(
  reimbursement: ReimbursementDTO
): Promise<Reimbursement> {
  let client: PoolClient;
  try {
    client = await connectionPool.connect();
    const reim = await client.query(
      `SELECT * FROM public.reimbursement WHERE reimbursement_id = $1;`,
      [reimbursement.reimbursement_id]
    );

    reimbursement.author = reimbursement.author || reim.rows[0].author;
    reimbursement.amount = reimbursement.amount || reim.rows[0].amount;
    reimbursement.dateSubmitted =
      reimbursement.dateSubmitted || reim.rows[0].dateSubmitted;
    reimbursement.dateResolved =
      reimbursement.dateResolved || reim.rows[0].date_resolved;
    reimbursement.description =
      reimbursement.description || reim.rows[0].description;
    reimbursement.resolver = reimbursement.resolver || reim.rows[0].resolver;
    reimbursement.status = reimbursement.status || reim.rows[0].status;
    reimbursement.type = reimbursement.type || reim.rows[0].type;

    await client.query(
      `UPDATE public.reimbursement SET author = $1, amount = $2, dateSubmitted = $3, dateResolved= $4, description = $5, resolver = $6, status = $7, "type" = $8 WHERE reimbursement_id = $9;`,
      [
        reimbursement.author,
        reimbursement.amount,
        reimbursement.dateSubmitted,
        reimbursement.dateResolved,
        reimbursement.description,
        reimbursement.resolver,
        reimbursement.status,
        reimbursement.type,
        reimbursement.reimbursement_id
      ]
    );
    let result = await client.query(
      `SELECT * FROM project0.reimbursement WHERE reimbursement_id = $1;`,
      [reimbursement.reimbursement_id]
    );
    return reimbursementDTOToReimbursement(result.rows[0]);
  } catch (e) {
    console.log(e);
    if (e.message === "Denied Reimbursement") {
      throw new DeniedReimbursement();
    } else {
      throw new InternalServerError();
    }
  } finally {
    client && client.release();
  }
}
