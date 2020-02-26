const knex = require('knex');
const { knexSnakeCaseMappers } = require('objection');

const knexfile = require('../../knexfile');

const env = process.env.NODE_ENV || 'development';

// const poolOptions = {
//   pool: {
//     async afterCreate(conn, done) {
//       let errors;
//       try {
//         await conn.execute(`ALTER SESSION SET TIME_ZONE = 'Asia/Jakarta'`);
//       } catch (err) {
//         errors = err;
//       } finally {
//         done(errors, conn);
//       }
//     },
//   },
// };

module.exports = knex({ ...knexfile[env], /* ...poolOptions, */ ...knexSnakeCaseMappers({ upperCase: true }) });
