export class ApiResponse {
  constructor(success, message, data = {}) {
    this.success = success || 201;
    this.message = message || "Success";
    this.data = data;
  }
}
