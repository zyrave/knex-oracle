exports.up = knex =>
  knex.schema
    .createTable('users', t => {
      t.integer('id').notNullable();
      t.string('username', 30)
        .unique()
        .notNullable();
      t.string('password', 100).notNullable();
      t.string('name', 100).notNullable();
      t.string('email', 50)
        .unique()
        .notNullable();
      t.boolean('confirmed')
        .notNullable()
        .defaultTo(false);
      t.boolean('is_active')
        .notNullable()
        .defaultTo(true);
      // t.date('created_at')
      //   .notNullable()
      //   .defaultTo(knex.fn.now());
      // t.date('updated_at')
      //   .notNullable()
      //   .defaultTo(knex.fn.now());
    })
    .then(() => console.log(`'USERS' table created`))
    .then(() =>
      knex.schema.raw(
        'ALTER TABLE USERS ADD (CREATED_AT DATE DEFAULT SYSDATE NOT NULL, UPDATED_AT DATE DEFAULT SYSDATE NOT NULL)',
      ),
    )
    .then(() => console.log(`'USERS' table altered`))
    .then(() =>
      knex.schema
        .raw('CREATE UNIQUE INDEX USERS_PK ON USERS(ID)')
        .on('query-error', (err, obj) => console.error('query-error:', err, 'obj:', obj)),
    )
    .then(() => console.log(`'USERS_PK' index created`))
    .then(() =>
      knex.schema
        .raw('CREATE SEQUENCE USERS_SEQ START WITH 1')
        .on('query-error', (err, obj) => console.error('query-error:', err, 'obj:', obj)),
    )
    .then(() => console.log(`'USERS_SEQ' sequence created`))
    .then(() =>
      knex.schema
        .raw(
          `CREATE OR REPLACE TRIGGER USERS_BI BEFORE INSERT ON USERS REFERENCING NEW AS new OLD AS old FOR EACH ROW\nBEGIN\n  :NEW.ID := USERS_SEQ.NEXTVAL;\nEND USERS_BI;`,
        )
        .on('query-error', (err, obj) => console.error('query-error:', err, 'obj:', obj)),
    )
    .then(() => console.log(`'USERS_BI' trigger created`))
    .then(() =>
      knex.schema
        .raw(
          `CREATE OR REPLACE TRIGGER USERS_BU BEFORE UPDATE ON USERS REFERENCING NEW AS new OLD AS old FOR EACH ROW\nBEGIN\n  :NEW.UPDATED_AT := SYSDATE;\nEND USERS_BU;`,
        )
        .on('query-error', (err, obj) => console.error('query-error:', err, 'obj:', obj)),
    )
    .then(() => console.log(`'USERS_BU' trigger created`))
    .then(() =>
      knex.schema
        .raw(`ALTER TABLE USERS ADD (\nCONSTRAINT USERS_PK PRIMARY KEY (ID) USING INDEX USERS_PK ENABLE VALIDATE\n)`)
        .on('query-error', (err, obj) => console.error('query-error:', err, 'obj:', obj)),
    )
    .then(() => console.log(`'USERS' table altered`))
    .catch(err => console.error(err));

exports.down = knex =>
  knex.schema
    .dropTableIfExists('users')
    .then(() => console.log(`'USERS' table deleted`))
    .catch(err => console.error(err));
