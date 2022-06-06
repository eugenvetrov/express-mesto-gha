const router = require('express').Router();
const {
  celebrate, Joi, Segments,
} = require('celebrate');
const {
  createUser, login,
} = require('../controllers/auth');

router.post('/signup', celebrate({
  [Segments.BODY]: {
    email: Joi.string().required(),
    password: Joi.string().required(),
  },
}), createUser);
router.post('/signin', login);

module.exports = router;
