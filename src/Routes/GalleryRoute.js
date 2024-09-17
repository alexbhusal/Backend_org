const {
  registerGallery,
  getGallery,
} = require('../Controllers/GalleryController');
const MulterUpload = require('../Utils/Multer');
const router = require('express').Router();
const ProtectRoute = require('../Middleware/ProtectRoute');

router
  .route('/register')
  .post(
    ProtectRoute,
    MulterUpload.array('gallery_picture', 10),
    registerGallery
  );
router.route('/all').get(getGallery);

module.exports = router;
