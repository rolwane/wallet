import express from 'express';
import cors from 'cors';
import router from './routes/ExpenseRouter';
import ExceptionHandler from './handlers/ExceptionHandler';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.middlewares();    
  }

  private middlewares(): void {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(router);
    this.app.use(ExceptionHandler.errorMiddleware);
  }
}

export default new App().app;
