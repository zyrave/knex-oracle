const hashPassword = require('../utils/hashPassword');
const createGuts = require('../utils/modelGuts');
const verifyPassword = require('../utils/verifyPassword');

const name = 'User';
const tableName = 'users';

const selectableProps = ['id', 'username', 'name', 'email', 'confirmed', 'isActive', 'createdAt', 'updatedAt'];

const beforeSave = async user => {
  if (!user.password) return Promise.resolve(user);
  const hashedPassword = await hashPassword(user.password);
  return { ...user, password: hashedPassword };
};

module.exports = knex => {
  const guts = createGuts({
    knex,
    name,
    tableName,
    selectableProps,
  });

  const create = async props => {
    const user = await beforeSave(props);
    return guts.create(user);
  };

  const update = async (id, props) => {
    const user = await beforeSave(props);
    return guts.update(id, user);
  };

  const verify = async (username, password) => {
    const matchErrorMsg = 'Invalid username or password';

    const users = await knex
      .select()
      .from(tableName)
      .where({ username })
      .timeout(guts.timeout);

    const user = users[0];
    if (!user) throw matchErrorMsg;

    const valid = await verifyPassword(password, user.password);
    if (!valid) throw matchErrorMsg;

    delete user.password;

    return user;
  };

  return {
    ...guts,
    create,
    update,
    verify,
  };
};
