const { createAdminAccount, getAdminByEmail } = require('../Utils/Queries');
const { Hash, compareHash } = require('../Utils/Hash');
const { CatchAsync } = require('../Utils/CatchAsync');
const { createJWTtoken } = require('../Utils/JWT');
const AppError = require('../Utils/AppError');

exports.signup = CatchAsync(async (req, res, next) => {
  req.body.password = await Hash(req.body.password);
  const result = await createAdminAccount(req.body);
  res.status(201).json({
    status: 'success',
    data: result,
  });
});

exports.login = CatchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError('Please enter email and password both'));

  const member = await getAdminByEmail(email);
  if (!member || !(await compareHash(password, member?.[0]?.password || '')))
    return next(new AppError('Email or password incorrect', 401));

  const JWT = createJWTtoken({ id: member[0]?.id });
  const oneMonth = 30 * 24 * 60 * 60 * 1000;
  const expirationDate = new Date(Date.now() + oneMonth);

  res.cookie('token', JWT, {
    expires: expirationDate,
  });
  res.status(200).json({
    message: 'Logged in successfully',
  });
});
