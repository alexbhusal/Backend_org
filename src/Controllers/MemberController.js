const uploadFromBuffer = require('../Utils/UploadFromBuffer');
const { createPicture } = require('../Utils/Queries');
const { CatchAsync } = require('../Utils/CatchAsync');
const AppError = require('../Utils/AppError');
const Queries = require('../Utils/Queries');

exports.createMember = CatchAsync(async (req, res, next) => {
  if (!req?.files)
    return next(new AppError('Please upload a profile picture', 400));
  const profilePicture = req.files[0];
  const resp = await uploadFromBuffer(profilePicture.buffer);
  const db_result = await createPicture({ picture_link: resp.secure_url });
  req.body.picture_id = db_result.insertId;

  const result = await Queries.createMember(req.body);
  res.status(201).json({
    status: 'success',
    data: result,
  });
});

exports.getAllMembers = CatchAsync(async (req, res, next) => {
  const members = await Queries.getAllMembers();
  res.status(200).json({
    status: 'success',
    data: members,
  });
});
