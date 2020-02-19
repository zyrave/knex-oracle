# KNEX DEMO

## Migration CLI

```bash
$ npm i -g knex
```

### Create knexfile

```bash
$ knex init

# or for .ts

$ knex init -x ts
```

### Create a migration file

```bash
$ knex migrate:make MIGRATION_NAME

# or for .ts

$ knex migrate:make MIGRATION_NAME -x ts
```

### Run migration files

```bash
$ knex migrate:latest
```

### Rollback the last batch of migrations

```bash
$ knex migrate:rollback
```

## Seed CLI

### Create a seed file

```bash
$ knex seed:make SEED_NAME
```

### Run seed files

```bash
$ knex seed:run
```
