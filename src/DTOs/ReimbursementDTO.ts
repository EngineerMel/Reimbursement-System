export class ReimbursementDTO {
  reimbursement_id: number;
  author: number;
  amount: number;
  dateSubmitted: number;
  dateResolved: number;
  description: string;
  resolver: number;
  status: number;
  type: number;

  constructor(
    reimbursement_id: number,
    author: number,
    amount: number,
    dateSubmitted: number,
    dateResolved: number,
    description: string,
    resolver: number,
    status: number,
    type: number
  ) {
    this.reimbursement_id = reimbursement_id;
    this.author = author;
    this.amount = amount;
    this.dateSubmitted = dateSubmitted;
    this.dateResolved = dateResolved;
    this.description = description;
    this.resolver = resolver;
    this.status = status;
    this.type = type;
  }
}
