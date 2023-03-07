import { Request, Response } from 'express';
import Expense from '../models/Expense';
import RequestLog from '../models/RequestLog';
import ExpenseService from '../services/ExpenseService';

class MainController {
  private service: ExpenseService;

  constructor() {
    this.service = new ExpenseService();
  }

  private logRequest = (req: Request) => {
    console.log(new RequestLog(req.url, req.method, req.body));
  };

  public getAll = async (req: Request, res: Response) => {
    const month = req.query.month as string;
    this.logRequest(req);
    return res.status(200).json(await this.service.getAll(month));
  };

  public addExpense = async (req: Request, res: Response) => {
    const month = req.query.month as string;
    const expense : Expense = req.body;
    this.logRequest(req);
    return res.status(201).json(await this.service.addExpense(expense, month));
  };

  public updateExpense = async (req: Request, res: Response) => {
    const month = req.query.month as string;
    const index = req.params.index as string;
    const expense : Expense = req.body;
    this.logRequest(req);
    return res.status(200).json(await this.service.updateExpense(expense, parseInt(index), month));
  };

  public deleteExpense = async (req: Request, res: Response) => {
    const month = req.query.month as string;
    const index = req.params.index;
    this.logRequest(req);
    return res.status(200).json(await this.service.deleteExpense(parseInt(index), month));
  };

  public getSheets = async (req: Request, res: Response) => {
    this.logRequest(req);
    return res.status(200).json(await this.service.getSheets());
  };
}

export default MainController;
