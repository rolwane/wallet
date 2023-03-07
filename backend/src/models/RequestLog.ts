class RequestLog {
  public url: string;
  public method: string;
  public body: string;

  constructor(url: string, method: string, body: string) {
    this.url = url;
    this.method = method;
    this.body = body;
  }
}

export default RequestLog;
