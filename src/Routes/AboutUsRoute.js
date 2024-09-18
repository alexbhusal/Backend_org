const router = require('express').Router();
const {
  registerAboutUs,
  getAboutUs,
} = require('../Controllers/AboutUsController');
const ProtectRoute = require('../Middleware/ProtectRoute');
router.route('/register').post(
  // ProtectRoute, 
  registerAboutUs);
router.route('/').get(getAboutUs);
module.exports = router;
