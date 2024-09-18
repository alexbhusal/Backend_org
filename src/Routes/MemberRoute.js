const MemberController = require('../Controllers/MemberController');
const protectRoute = require('../Middleware/ProtectRoute');
const MulterUpload = require('../Utils/Multer');
const router = require('express').Router();

router.get('/', MemberController.getAllMembers);
router
  .route('/create')
  .post(
    //protectRoute,
    MulterUpload.array('profile_picture', 1),
    MemberController.createMember
  );

module.exports = router;
