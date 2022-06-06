const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ServerError = require('../errors/server');
const ConflictError = require('../errors/conflict');
const BadRequestError = require('../errors/badRequest');
const NotFoundError = require('../errors/notFound');

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      User.validate({
        name, about, avatar, email, password: hash,
      });
      return hash;
    })
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const fields = Object.keys(err.errors).join(', ');
        next(new BadRequestError(`Поле ${fields} заполнено некорректно. ${err.errors.email}`));
      } else if (err.code === 11000) {
        next(
          new ConflictError('Данный пользователь уже существует в базе данных'),
        );
      } else {
        next(new ServerError(err.message));
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь не найден'));
      } else {
        const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
        res.status(200).cookie('token', token, { httpOnly: true }).send({ message: 'Авторизация прошла успешно' });
      }
    })
    .catch(() => {
      next(new ServerError());
    });
};

module.exports = {
  createUser,
  login,
};
