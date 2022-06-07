const router = require('express').Router();
const {
  celebrate, Joi,
} = require('celebrate');
const {
  getUsers,
  getUserById,
  checkUser,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', checkUser);
router.get('/:userId', celebrate({
  params: {
    userId: Joi.string().required(),
  },
}), getUserById);
router.patch('/me', celebrate({
  body: {
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  },
}), updateUser);
router.patch('/me/avatar', celebrate({
  body: {
    avatar: Joi.string().regex(/^https?:\/\/(w{3})?[\w0-9-._~:/?#\[\]@!$&'()*+,;=]{1,}#?/).required(), // eslint-disable-line
  },
}), updateUserAvatar);

module.exports = router;
