const multer = require('multer');
const AppError = require('./AppError');

const storage = multer.memoryStorage();

const filter = (request, file, cb) => {
  if (file.mimetype.startsWith('image') || file.mimetype.startsWith('video')) {
    cb(null, true);
  } else {
    cb(new AppError('You can upload images and videos only', false));
  }
};

const upload = multer({
  fileFilter: filter,
  storage,
});

module.exports = upload;
