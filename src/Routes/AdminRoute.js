const router = require('express').Router();
const { login, signup } = require('../Controllers/AdminController');

router.route('/signup').post(signup);
router.route('/login').post(login);

module.exports = router;
