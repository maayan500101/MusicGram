export class CustomError extends Error {
  status?: number; // Explicitly declaring the status property

  constructor(message: string, status?: number) {
    super(message);
    this.status = status;
  }
}
