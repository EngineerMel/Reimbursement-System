export class ReimbursementId {
  reimbursementId: number;
  author: number; //foreign key to user_id
  amount: number;
  dateSubmitted: number;
  dateResolved: number;
  description: string;
  resolver: number; //foreign key to user_id
  status: number; //foreign key to reimb-status
  type: number; //foreign key to reimb-type

  constructor(
    reimbursementId: number,
    author: number,
    amount: number,
    dateSubmitted: number,
    dateResolved: number,
    description: string,
    resolver: number,
    status: number,
    type: number
  ) {
    this.reimbursementId = reimbursementId;
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
