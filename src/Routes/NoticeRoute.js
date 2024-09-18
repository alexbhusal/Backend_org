const router = require('express').Router();
const {
  getAllNotices,
  publishNotice,
} = require('../Controllers/NoticeController');
const ProtectRoute = require('../Middleware/ProtectRoute');

router.route('/all').get(getAllNotices);
router.route('/publish').post(
  // ProtectRoute, 
  publishNotice);

module.exports = router;
