const { User } = require('../models');

const getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();

    res.json({
      ok: true,
      message: 'Users found',
      errors: null,
      data: users,
    });
  } catch (err) {
    res.status(400).json({
      ok: false,
      message: null,
      errors: err,
      data: null,
    });

    next();
  }
};

const postUser = async (req, res, next) => {
  const props = req.body;

  try {
    const user = await User.create(props);

    res.json({
      ok: true,
      message: 'User created',
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

    next();
  }
};

const putUser = async (req, res, next) => {
  const { id } = req.params;
  const props = req.body;

  try {
    const user = await User.update(id, props);

    res.json({
      ok: true,
      message: 'User updated',
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

    next();
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleteCount = await User.destroy(id);

    res.json({
      ok: true,
      message: `User '${id}' deleted`,
      errors: null,
      data: deleteCount,
    });
  } catch (err) {
    res.status(400).json({
      ok: false,
      message: null,
      errors: err,
      data: null,
    });

    next();
  }
};

module.exports = {
  getUsers,
  postUser,
  putUser,
  deleteUser,
};
