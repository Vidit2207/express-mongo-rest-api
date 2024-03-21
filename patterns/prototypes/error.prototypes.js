class MissingValueError extends Error {
  constructor(service, field) {
    let message = "Missing Value Encountered";
    if (service) {
      if (!field) {
        message = `${service} has a missing value`;
      } else {
        message = `${service} has a missing value: ${field}`;
      }
    }
    super(message);
    this.message = message;
    this.status = 404;
  }
}

module.exports = { MissingValueError };
