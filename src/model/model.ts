export class Model {
  public title: string;
  public memo: string;
  public closedDate: string;
  public closedStatus: boolean;

  constructor(title: string, memo: string, closedDate: string, closedStatus: boolean) {
    this.title = title;
    this.memo = memo;
    this.closedDate = closedDate;
    this.closedStatus = closedStatus;
  }
}
