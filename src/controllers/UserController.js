const _ = require('lodash');

const { User } = require('../models');
// const  User = require('../models/User'); // if it not using modelGuts

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

const getActiveUsers = async (req, res, next) => {
  const { is_active: isActive, confirmed } = req.query;

  try {
    const users = await User.find({ isActive, confirmed });

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

const getUsers = async (req, res, next) => {
  if (!_.isEmpty(req.query)) {
    if (req.query.is_active && req.query.confirmed) {
      getActiveUsers(req, res, next);
    } else {
      res.status(500).json({
        ok: false,
        message: null,
        errors: 'Not implemented yet',
        data: null,
      });
    }
  } else {
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
  }
};

const getUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ id });

    res.json({
      ok: true,
      message: 'Users found',
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

module.exports = {
  postUser,
  putUser,
  deleteUser,
  getActiveUsers,
  getUsers,
  getUser,
};
