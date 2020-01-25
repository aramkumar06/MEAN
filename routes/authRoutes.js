const router = require('express').Router();
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
  updateMe,
  deleteMe
} = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);

router.patch('/resetPassword/:token', resetPassword);
router.patch('/updatePassword', protect, updatePassword);
router.patch('/updateMe', protect, updateMe);

router.delete('/deleteMe', protect, deleteMe);

module.exports = router;
