const router = require('express').Router();
const {
  getAllReviews,
  createReview
} = require('../controllers/reviewController');
const { restrictTo, protect } = require('../controllers/authController');

router
  .route('/')
  .get(getAllReviews)
  .post(protect, restrictTo('user'), createReview);

module.exports = router;
