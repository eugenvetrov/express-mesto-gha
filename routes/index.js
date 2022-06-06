const router = require('express').Router();
const {
  celebrate, Joi,
} = require('celebrate');
const {
  createUser, login,
} = require('../controllers/auth');

router.post('/signup', celebrate({
  body: {
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(new RegExp(/^https?:\/\/(w{3})?[\w0-9-._~:/?#\[\]@!$&'()*+,;=]{1,}#?/)),  // eslint-disable-line
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  },
}), createUser);
router.post('/signin', celebrate({
  body: {
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  },
}), login);

module.exports = router;
