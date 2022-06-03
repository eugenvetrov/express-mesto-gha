const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', auth, getUsers);
router.get('/:userId', auth, getUserById);
router.patch('/me', auth, updateUser);
router.patch('/me/avatar', auth, updateUserAvatar);

module.exports = router;
