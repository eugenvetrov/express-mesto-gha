class ConflictError extends Error {
  constructor(message = 'конфликт запроса с текущим состоянием сервера') {
    super(message);
    this.code = 409;
  }
}

module.exports = ConflictError;
