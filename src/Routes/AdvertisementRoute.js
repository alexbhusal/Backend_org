const router = require('express').Router();
const {
  getAllAdvertisement,
  registerAdvertisement,
} = require('../Controllers/AdvertisementController');
const multerUpload = require('../Utils/Multer');
const ProtectRoute = require('../Middleware/ProtectRoute');

router.get('/all', getAllAdvertisement);
router.post(
  '/register',
  // ProtectRoute,
  multerUpload.single('advertisement_picture'),
  registerAdvertisement
);

module.exports = router;
