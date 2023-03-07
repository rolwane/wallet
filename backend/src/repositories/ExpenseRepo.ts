import { GoogleSpreadsheet, GoogleSpreadsheetWorksheet } from 'google-spreadsheet';
import dotenv from 'dotenv';

import NotFoundException from '../exceptions/NotFoundException';
import Expense from '../models/Expense';
import BadRequestException from '../exceptions/BadRequestException';

dotenv.config();

class ExpenseRepo {

  private doc: GoogleSpreadsheet;
  private sheet: GoogleSpreadsheetWorksheet;

  constructor() {
    this.setup();
  }
  
  private setup = async () => {
    this.doc = new GoogleSpreadsheet(process.env.SHEET_ID);
    await this.doc.useServiceAccountAuth({ client_email: process.env.CLIENT_EMAIL as string, private_key: process.env.PRIVATE_KEY as string });
    await this.doc.loadInfo();
  };

  private getSheet = async (sheetTitle: string) => {
    const sheet = this.doc.sheetsByTitle[sheetTitle];

    if (!sheet) {
      throw new NotFoundException(`The sheet with the title '${sheetTitle}' was not found`);
    }

    return sheet;
  };

  private getRow = async (index: number, sheetTitle: string) => {
    this.sheet = await this.getSheet(sheetTitle);
    const rows = await this.getRows(sheetTitle);

    if (!rows[index]) {
      throw new BadRequestException('The Expense not exists');
    }

    return rows[index];
  };
  
  public addRow = async (expense: Expense, sheetTitle: string) => {
    this.sheet = await this.getSheet(sheetTitle);
    await this.sheet.addRow({ title: expense.title, value: expense.value, due_date: expense.dueDate, paid: expense.paid });
  };

  public getRows = async (sheetTitle: string) => {
    this.sheet = await this.getSheet(sheetTitle);
    return await this.sheet.getRows();
  };

  public updateRow = async (expense: Expense, index: number, sheetTitle: string) => {
    const row = await this.getRow(index, sheetTitle);

    row.title = expense.title;
    row.value = expense.value;
    row.due_date = expense.dueDate;
    row.paid = expense.paid;

    row.save();
  };

  public deleteRow = async (index: number, sheetTitle: string) => {
    (await this.getRow(index, sheetTitle)).delete();
  };

  public getSheets = async () => {
    await this.setup();

    const sheets: GoogleSpreadsheetWorksheet[] =  Object.values(this.doc['_rawSheets']);
    return sheets.map((sheet) => sheet['_rawProperties'].title );
  };
}

export default ExpenseRepo;
