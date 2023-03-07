import { Router } from 'express';
import MainController from '../controllers/ExpenseController';
import middleware from '../middlewares/Middleware';
import 'express-async-errors';

class MainRouter {
  public router: Router;
  private controller: MainController;

  constructor() {
    this.router = Router();
    this.controller = new MainController();
    this.routes();
  }

  private routes() {
    this.router.get('/sheets', this.controller.getSheets);
    this.router.get('/expenses', this.controller.getAll);
    this.router.post('/expenses', middleware.validateExpenseBody, this.controller.addExpense);
    this.router.delete('/expenses/:index', this.controller.deleteExpense);
    this.router.put('/expenses/:index', this.controller.updateExpense);
  }
}

export default new MainRouter().router;
