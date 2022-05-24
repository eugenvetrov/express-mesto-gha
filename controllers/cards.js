const mongoose = require('mongoose');
const Card = require('../models/card');
const ServerError = require('../errors/server');
const ConflictError = require('../errors/conflict');
const NotFoundError = require('../errors/notFound');
const BadRequestError = require('../errors/badRequest');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => {
      next(new ServerError());
    });
};

const createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const fields = Object.keys(err.errors).join(', ');
        next(new BadRequestError(`Поле ${fields} заполнено некорректно`));
      }
      if (err.code === 11000) {
        next(new ConflictError('Данная карточка уже существует в базе данных'));
      }
      next(new ServerError());
    });
};

const likeCard = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.cardId)) {
    next(new BadRequestError('Передаваемые данные не валидны'));
  }
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка не найдена'));
      }
      res.send({ data: card });
    })
    .catch(() => {
      next(new ServerError());
    });
};

const dislikeCard = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.cardId)) {
    next(new BadRequestError('Передаваемые данные не валидны'));
  }
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка не найдена'));
      }
      res.send({ data: card });
    })
    .catch(() => {
      next(new ServerError());
    });
};

const deleteCardById = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.cardId)) {
    next(new BadRequestError('Передаваемые данные не валидны'));
  }

  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка не найдена'));
      }
    })
    .catch(() => {
      next(new ServerError());
    });
};

module.exports = {
  getCards,
  createCard,
  likeCard,
  dislikeCard,
  deleteCardById,
};
