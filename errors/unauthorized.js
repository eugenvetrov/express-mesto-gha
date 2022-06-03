const UNATHORIZED = 401;
class Unauthorized extends Error {
  constructor(
    message = 'Простите, не удалось авторизоваться',
  ) {
    super(message);
    this.code = UNATHORIZED;
  }
}

module.exports = Unauthorized;
