const router = require('express').Router();

const { postUser, putUser, deleteUser, getUsers, getUser } = require('../controllers/UserController');

router
  .route('/users')
  .post(postUser)
  .get(getUsers);

router
  .route('/users/:id')
  .put(putUser)
  .delete(deleteUser)
  .get(getUser);

module.exports = router;
