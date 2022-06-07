const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/unauthorized');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer') || !req.headers.cookie.startsWith('token')) {
    next(new Unauthorized('Необходима авторизация'));
  } else {
    let token;
    if (authorization) { token = authorization.replace('Bearer ', ''); } else if (req.headers.cookie.startsWith('token')) { token = authorization.replace('token=', ''); }
    let payload;
    try {
      payload = jwt.verify(token, 'some-secret-key');
    } catch (err) {
      next(new Unauthorized('Необходима авторизация'));
    }
    req.user = payload;
    next();
  }
};
