const UNATHORIZED_CODE = 401;
class Unauthorized extends Error {
  constructor(
    message = 'Простите, не удалось авторизоваться',
  ) {
    super(message);
    this.code = UNATHORIZED_CODE;
  }
}

module.exports = Unauthorized;
