const { CatchAsync } = require('../Utils/CatchAsync');
const uploadFromBuffer = require('../Utils/UploadFromBuffer');
const {
  createGalleryPicture,
  createGallery,
  getGallery,
} = require('../Utils/Queries');
const AppError = require('../Utils/AppError');

exports.registerGallery = CatchAsync(async (req, res, next) => {
  if (!req.body.event_name || !req.body.description || !req.files)
    return next(
      new AppError(
        'Please provide event name, description and gallery images',
        400
      )
    );
  const gallery = await createGallery({
    event_name: req.body.event_name,
    description: req.body.description,
  });
  const galleryPictures = req.files;
  if (galleryPictures.length) {
    galleryPictures.forEach(async (file) => {
      const res = await uploadFromBuffer(file.buffer);
      await createGalleryPicture({
        gallery_id: gallery.insertId,
        picture_link: res.secure_url,
      });
    });
  }

  res.status(200).json({
    status: 'success',
    message: 'Gallery registered successfully',
  });
});

exports.getGallery = CatchAsync(async (req, res, next) => {
  const galleries = await getGallery();
  res.status(200).json({
    data: galleries,
  });
});

