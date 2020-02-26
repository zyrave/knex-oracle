const { Product } = require('../models');

const postProduct = async (req, res, next) => {
  const props = req.body;

  try {
    const user = await Product.create(props);

    res.json({
      ok: true,
      message: 'Product created',
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

const putProduct = async (req, res, next) => {
  const { id } = req.params;
  const props = req.body;

  try {
    const user = await Product.update(id, props);

    res.json({
      ok: true,
      message: 'Product updated',
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

const deleteProduct = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleteCount = await Product.destroy(id);

    res.json({
      ok: true,
      message: `Product '${id}' deleted`,
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

const getProducts = async (req, res, next) => {
  try {
    const users = await Product.findAll();

    res.json({
      ok: true,
      message: 'Products found',
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

const getProduct = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await Product.findOne({ id });

    res.json({
      ok: true,
      message: 'Products found',
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
  postProduct,
  putProduct,
  deleteProduct,
  getProducts,
  getProduct,
};
