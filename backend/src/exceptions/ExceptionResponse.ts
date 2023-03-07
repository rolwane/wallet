import { StatusCodes } from 'http-status-codes/build/cjs/status-codes';

class ExceptionResponse {
  public status: StatusCodes;
  public title: string;
  public message: string;
  public timestamp: number;

  constructor(status: StatusCodes, title: string, message: string, timestamp: number) {
    this.status = status;
    this.title = title;
    this.message = message;
    this.timestamp = timestamp;
  }
}

export default ExceptionResponse;
