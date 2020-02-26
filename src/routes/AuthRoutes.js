const router = require('express').Router();
const { postLogin, postRegister } = require('../controllers/AuthController');

router.route('/login').post(postLogin);

router.route('/register').post(postRegister);

module.exports = router;
