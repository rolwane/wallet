import { GoogleSpreadsheetRow } from 'google-spreadsheet';
import Expense from '../models/Expense';
import ExpenseRepo from '../repositories/ExpenseRepo';

class ExpenseService {
  private repo: ExpenseRepo;

  constructor() {
    this.repo = new ExpenseRepo();
  }

  private expenseSerialize = (rows: GoogleSpreadsheetRow[]) => {
    return rows.map(({ title, value, due_date, paid }) => new Expense(title, +value, due_date, JSON.parse(paid.toLowerCase())));
  };

  public getAll = async (sheetTitle: string) => {
    const rows = await this.repo.getRows(sheetTitle);
    return this.expenseSerialize(rows);
  };

  public addExpense = async (expense: Expense, sheetTitle: string) => {
    await this.repo.addRow(expense, sheetTitle);
    return expense;
  };

  public updateExpense = async (expense: Expense, index: number, sheetTitle: string) => {
    await this.repo.updateRow(expense, index, sheetTitle);
  };

  public deleteExpense = async (index: number, sheetTitle: string) => {
    await this.repo.deleteRow(index, sheetTitle);
  };

  public getSheets = async () => {
    return await this.repo.getSheets();
  };
}

export default ExpenseService;
