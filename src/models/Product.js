const createGuts = require('../utils/modelGuts');

const name = 'Product';
const tableName = 'products';

const selectableProps = [
  'id',
  'name',
  'category',
  'price',
  'quantity',
  'image',
  'isActive',
  'createdAt',
  'updatedAt',
  'createdBy',
];

module.exports = knex => {
  const guts = createGuts({
    knex,
    name,
    tableName,
    selectableProps,
  });

  return {
    ...guts,
  };
};
