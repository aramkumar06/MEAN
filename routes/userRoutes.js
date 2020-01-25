const router = require('express').Router();
const { getAllUsers } = require('../controllers/userController');
// const { protect } = require('../controllers/authController');

router.route('/').get(getAllUsers);
// .post(createTour);

router.route('/:id');
// .get(getTour)
// .patch(updateTour)
// .delete(deleteTour);

module.exports = router;
