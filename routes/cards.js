const router = require('express').Router();
const {
  getCards,
  createCard,
  likeCard,
  dislikeCard,
  deleteCardById,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);
router.delete('/:cardId', deleteCardById);

module.exports = router;
