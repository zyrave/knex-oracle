const createGuts = require('../utils/modelGuts');

const name = 'User';
const tableName = 'users';

const selectableProps = [
  'id',
  'first_name AS firstName',
  'last_name AS lastName',
  'email',
  'password',
  'confirmed',
  'is_active AS isActive',
  'created_at AS createdAt',
  'updated_at AS updatedAt',
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
