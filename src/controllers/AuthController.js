const { User } = require('../models');
const { createError, BAD_REQUEST, CONFLICT, UNAUTHORIZED } = require('../utils/errorHelper');

const postRegister = async (req, res, next) => {
  const props = req.body;

  const isUserExist = await User.findOne({ username: props.username });

  if (isUserExist) {
    next(
      createError({
        status: CONFLICT,
        message: 'Username already exists',
      }),
    );
  }

  try {
    const user = await User.create(props);

    res.json({
      ok: true,
      message: 'Registration successful',
      errors: null,
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      ok: false,
      message: null,
      errors: err,
      data: null,
    });
  }
};

const postLogin = async (req, res, next) => {
  // const username = String(req.body.username);
  // const password = String(req.body.password);

  const { username, password } = req.body;

  if (!username || !password) {
    next(
      createError({
        status: BAD_REQUEST,
        message: `'username' and 'password' are required fields`,
      }),
    );
  }

  try {
    const user = await User.verify(username, password);

    res.json({
      ok: true,
      message: 'Login successful',
      errors: null,
      data: user,
    });
  } catch (err) {
    next(
      createError({
        status: UNAUTHORIZED,
        message: err,
      }),
    );
  }
};

module.exports = {
  postRegister,
  postLogin,
};
