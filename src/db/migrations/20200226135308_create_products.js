exports.up = knex =>
  knex.schema
    .createTable('products', t => {
      t.integer('id').notNullable();
      t.string('name', 100)
        .unique()
        .notNullable();
      t.string('category', 100).notNullable();
      t.decimal('price')
        .notNullable()
        .defaultTo(0);
      t.decimal('quantity')
        .notNullable()
        .defaultTo(0);
      t.string('image', 200);
      t.boolean('is_active')
        .notNullable()
        .defaultTo(true);
      t.integer('created_by').notNullable();
      // t.date('created_at')
      //   .notNullable()
      //   .defaultTo(knex.fn.now());
      // t.date('updated_at')
      //   .notNullable()
      //   .defaultTo(knex.fn.now());
    })
    .then(() => console.log(`'PRODUCTS' table created`))
    .then(() =>
      knex.schema.raw(
        'ALTER TABLE PRODUCTS ADD (CREATED_AT DATE DEFAULT SYSDATE NOT NULL, UPDATED_AT DATE DEFAULT SYSDATE NOT NULL)',
      ),
    )
    .then(() => console.log(`'PRODUCTS' table altered`))
    .then(() =>
      knex.schema
        .raw('CREATE UNIQUE INDEX PRODUCTS_PK ON PRODUCTS(ID)')
        .on('query-error', (err, obj) => console.error('query-error:', err, 'obj:', obj)),
    )
    .then(() => console.log(`'PRODUCTS_PK' index created`))
    .then(() =>
      knex.schema
        .raw('CREATE SEQUENCE PRODUCTS_SEQ START WITH 1')
        .on('query-error', (err, obj) => console.error('query-error:', err, 'obj:', obj)),
    )
    .then(() => console.log(`'PRODUCTS_SEQ' sequence created`))
    .then(() =>
      knex.schema
        .raw(
          `CREATE OR REPLACE TRIGGER PRODUCTS_BI BEFORE INSERT ON PRODUCTS REFERENCING NEW AS new OLD AS old FOR EACH ROW\nBEGIN\n  :NEW.ID := PRODUCTS_SEQ.NEXTVAL;\nEND PRODUCTS_BI;`,
        )
        .on('query-error', (err, obj) => console.error('query-error:', err, 'obj:', obj)),
    )
    .then(() => console.log(`'PRODUCTS_BI' trigger created`))
    .then(() =>
      knex.schema
        .raw(
          `CREATE OR REPLACE TRIGGER PRODUCTS_BU BEFORE UPDATE ON PRODUCTS REFERENCING NEW AS new OLD AS old FOR EACH ROW\nBEGIN\n  :NEW.UPDATED_AT := SYSDATE;\nEND PRODUCTS_BU;`,
        )
        .on('query-error', (err, obj) => console.error('query-error:', err, 'obj:', obj)),
    )
    .then(() => console.log(`'PRODUCTS_BU' trigger created`))
    .then(() =>
      knex.schema
        .raw(
          `ALTER TABLE PRODUCTS ADD (\nCONSTRAINT PRODUCTS_PK PRIMARY KEY (ID) USING INDEX PRODUCTS_PK ENABLE VALIDATE\n)`,
        )
        .on('query-error', (err, obj) => console.error('query-error:', err, 'obj:', obj)),
    )
    .then(() => console.log(`'PRODUCTS' table altered`))
    .catch(err => console.error(err));

exports.down = knex =>
  knex.schema
    .dropTableIfExists('products')
    .then(() => console.log(`'PRODUCTS' table deleted`))
    .catch(err => console.error(err));
