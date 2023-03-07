class Expense {
  public title: string;
  public value: number;
  public dueDate: string;
  public paid: boolean;

  constructor(title: string, value: number, dueDate: string, paid: boolean) {
    this.title = title;
    this.value = value;
    this.dueDate = dueDate;
    this.paid = paid;
  }
}

export default Expense;
