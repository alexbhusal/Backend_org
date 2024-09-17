const AppError = require('../Utils/AppError');
const { CatchAsync } = require('../Utils/CatchAsync');
const { registerAboutUs, getAboutUs } = require('../Utils/Queries');

exports.registerAboutUs = CatchAsync(async (req, res, next) => {
  if (!req.body.name || !req.body.description)
    return next(new AppError('Please provide name and description', 400));
  await registerAboutUs(req.body);
  res.status(200).json({
    status: 'success',
    message: 'Data registered successfully',
  });
});

exports.getAboutUs = CatchAsync(async (req, res, next) => {
  const aboutUs = await getAboutUs();
  res.status(200).json({
    status: 'success',
    data: aboutUs,
  });
});
