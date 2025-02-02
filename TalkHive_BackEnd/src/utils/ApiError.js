export class ApiError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode || 500;
    this.message = message || "Something went wrong";
  }
}
