const mongoose = require('mongoose');
const User = require('../models/user');
const ServerError = require('../errors/server');
const ConflictError = require('../errors/conflict');
const NotFoundError = require('../errors/notFound');
const BadRequestError = require('../errors/badRequest');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => next(new ServerError()));
};

const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const fields = Object.keys(err.errors).join(', ');
        next(new BadRequestError(`Поле ${fields} заполнено некорректно`));
      }
      if (err.code === 11000) {
        next(
          new ConflictError('Данный пользователь уже существует в базе данных'),
        );
      }
      next(new ServerError());
    });
};

const getUserById = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
    next(new BadRequestError('Передаваемые данные не валидны'));
  }
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь не найден'));
      }
      res.status(200).send({ data: user });
    })
    .catch(() => {
      next(new ServerError());
    });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь не найден'));
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const fields = Object.keys(err.errors).join(', ');
        next(new BadRequestError(`Поле ${fields} заполнено некорректно`));
      }
      next(new ServerError());
    });
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь не найден'));
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const fields = Object.keys(err.errors).join(', ');
        next(new BadRequestError(`Поле ${fields} заполнено некорректно`));
      }
      next(new ServerError());
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
};
