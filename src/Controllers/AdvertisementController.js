const {
  registerAdvertisement,
  getAllAdvertisement,
  createPicture,
} = require('../Utils/Queries');
const uploadFromBuffer = require('../Utils/UploadFromBuffer');
const { CatchAsync } = require('../Utils/CatchAsync');
const AppError = require('../Utils/AppError');

exports.registerAdvertisement = CatchAsync(async (req, res, next) => {
  let uploadedPictureURL;
  if (!req?.file?.buffer)
    return next(new AppError('Please provide an image', 400));

  const resp = await uploadFromBuffer(req.file.buffer);
  uploadedPictureURL = resp.secure_url;

  const db_result = await createPicture({ picture_link: uploadedPictureURL });
  req.body.picture_id = db_result.insertId;
  await registerAdvertisement(req.body);

  res.status(201).json({
    message: 'Advertisement registered successfully',
  });
});

exports.getAllAdvertisement = CatchAsync(async (req, res, next) => {
  const advertisements = await getAllAdvertisement();

  res.status(200).json({
    status: 'success',
    data: advertisements,
  });
});
