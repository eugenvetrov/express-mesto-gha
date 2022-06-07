const router = require('express').Router();
const {
  celebrate, Joi,
} = require('celebrate');
const {
  getCards,
  createCard,
  likeCard,
  dislikeCard,
  deleteCardById,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', celebrate({
  body: {
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().regex(/^https?:\/\/(w{3})?[\w0-9-._~:/?#\[\]@!$&'()*+,;=]{1,}#?/).required(), // eslint-disable-line
  },
}), createCard);
router.put('/:cardId/likes', celebrate({
  params: {
    cardId: Joi.string().regex(/^[a-f\d]{24}$/).required(),
  },
}), likeCard);
router.delete('/:cardId/likes', celebrate({
  params: {
    cardId: Joi.string().regex(/^[a-f\d]{24}$/).required(),
  },
}), dislikeCard);
router.delete('/:cardId', celebrate({
  params: {
    cardId: Joi.string().regex(/^[a-f\d]{24}$/).required(),
  },
}), deleteCardById);

module.exports = router;
