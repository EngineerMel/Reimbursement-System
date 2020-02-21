export class Reimbursement_status {
  statusId: number;
  status: string;

  constructor(statusId: number, status: string) {
    this.statusId = statusId;
    this.status = status;
  }
}
