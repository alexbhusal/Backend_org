const AppError = require('../Utils/AppError');
const { CatchAsync } = require('../Utils/CatchAsync');
const { verifyJWTtoken } = require('../Utils/JWT');
const { getAdminById } = require('../Utils/Queries');

module.exports = CatchAsync(async function (req, res, next) {
  const cookie = req?.headers?.cookie;
  const token = cookie?.split('=')?.[1];
  if (!token) return next(new AppError('Please login to continue',401));
  const decoded = verifyJWTtoken(token);
  const admin_info = await getAdminById(decoded.id);
  if (!admin_info?.length)
    return next(new AppError('User no longer exists', 500));
  next();
});
