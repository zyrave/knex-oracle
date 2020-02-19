exports.up = knex =>
  knex.schema.createTable('users', t => {
    t.increments('id').primary();
    t.string('first_name', 100).notNullable();
    t.string('last_name', 100).notNullable();
    t.string('email', 50)
      .unique()
      .index()
      .notNullable();
    t.string('password', 100).notNullable();
    t.boolean('confirmed')
      .notNullable()
      .defaultTo(false);
    t.boolean('is_active')
      .notNullable()
      .defaultTo(true);
    t.timestamp('created_at')
      .notNullable()
      .defaultTo(knex.fn.now());
    t.timestamp('updated_at')
      .notNullable()
      .defaultTo(knex.fn.now());
  });

exports.down = knex => knex.schema.dropTableIfExists('users');
