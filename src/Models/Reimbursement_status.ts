export class Reimbursement_status {
  status_id: number;
  status: string;

  constructor(status_id: number, status: string) {
    this.status_id = status_id;
    this.status = status;
  }
}
