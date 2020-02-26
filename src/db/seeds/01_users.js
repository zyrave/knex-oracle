const db = require('../../config/db');
const hashPassword = require('../../utils/hashPassword');

const PASSWORD = '123456';
const SALT_ROUNDS = 12;

const data = [
  {
    username: 'john.doe',
    name: 'John Doe',
    email: 'john.doe@company.com',
    confirmed: 1,
    isActive: 1,
  },
  {
    username: 'sam.smith',
    name: 'Sam Smith',
    email: 'sam.smith@company.com',
    confirmed: 0,
    isActive: 1,
  },
];

exports.seed = async () => {
  const hashedPassword = await hashPassword(PASSWORD, SALT_ROUNDS);
  const users = data.map(user => ({ ...user, password: hashedPassword }));
  await db('users').del();
  await db('users').insert(users);
};
