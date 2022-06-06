const router = require('express').Router();
const {
  celebrate, Joi, Segments,
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
  [Segments.PARAMS]: {
    userId: Joi.string().required(),
  },
}), getUserById);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
