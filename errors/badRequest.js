class BadRequestError extends Error {
  constructor(
    message = 'Сервер не смог понять запрос из-за недействительного синтаксиса',
  ) {
    super(message);
    this.code = 400;
  }
}

module.exports = BadRequestError;
