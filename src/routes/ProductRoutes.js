const router = require('express').Router();

const { postProduct, putProduct, deleteProduct, getProducts, getProduct } = require('../controllers/ProductController');

router
  .route('/products')
  .post(postProduct)
  .get(getProducts);

router
  .route('/products/:id')
  .put(putProduct)
  .delete(deleteProduct)
  .get(getProduct);

module.exports = router;
