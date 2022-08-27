class ErrorClone extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }
}

module.exports = {
  ErrorClone,
};
