const router = require('express').Router();

const { getUsers, postUser, putUser, deleteUser } = require('../controllers/userController');

router
  .route('/users')
  .post(postUser)
  .get(getUsers);

router
  .route('/users/:id')
  .put(putUser)
  .delete(deleteUser);
//   .get(getUser)

module.exports = router;
