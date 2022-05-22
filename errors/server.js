class ServerError extends Error {
  constructor(message = 'Произошла ошибка') {
    super(message);
    this.code = 500;
  }
}

module.exports = ServerError;
