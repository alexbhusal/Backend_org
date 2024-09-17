const { CatchAsync } = require('../Utils/CatchAsync');
const { getAllNotice, registerNotice } = require('../Utils/Queries');

exports.publishNotice = CatchAsync(async (req, res, next) => {
  await registerNotice(req.body);
  res.status(200).json({
    message: 'Notice published successfully',
  });
});

exports.getAllNotices = CatchAsync(async (req, res, next) => {
  const notices = await getAllNotice();
  res.status(200).json({
    notices,
  });
});
