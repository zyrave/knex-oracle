// The guts of a model that uses Knexjs to store and retrieve data from a
// database using the provided `knex` instance. Custom functionality can be
// composed on top of this set of common guts.
//
// The idea is that these are the most-used types of functions that most/all
// "models" will want to have. They can be overriden/modified/extended if
// needed by composing a new object out of the one returned by this function ;)
module.exports = ({ knex = {}, name = 'name', tableName = 'tablename', selectableProps = [], timeout = 1000 }) => {
  const create = async props => {
    let result;

    delete props.id; // not allowed to set `id`

    try {
      result = await knex
        .insert(props)
        .into(tableName)
        .returning(selectableProps)
        .timeout(timeout);
    } catch (err) {
      console.error(err);
    }

    return result;
  };

  const update = async (id, props) => {
    let result;

    delete props.id; // not allowed to set `id`

    try {
      result = await knex
        .update(props)
        .from(tableName)
        .where({ id })
        .returning(selectableProps)
        .timeout(timeout);
    } catch (err) {
      console.error(err);
    }

    return result;
  };

  const destroy = async id => {
    let result;

    try {
      result = await knex
        .del()
        .from(tableName)
        .where({ id })
        .timeout(timeout);
    } catch (err) {
      console.error(err);
    }

    return result;
  };

  const findAll = async () => {
    let results;

    try {
      results = await knex
        .select(selectableProps)
        .from(tableName)
        .timeout(timeout);
    } catch (err) {
      console.error(err);
    }

    return results;
  };

  const find = async filters => {
    let results;

    try {
      results = await knex
        .select(selectableProps)
        .from(tableName)
        .where(filters)
        .timeout(timeout);
    } catch (err) {
      console.error(err);
    }

    return results;
  };

  // Same as `find` but only returns the first match if > 1 are found.
  const findOne = async filters => {
    const results = await find(filters);
    if (!Array.isArray(results)) return results;
    return results[0];
  };

  const findById = async id => {
    let result;

    try {
      result = await knex
        .select(selectableProps)
        .from(tableName)
        .where({ id })
        .timeout(timeout);
    } catch (err) {
      console.error(err);
    }

    return result;
  };

  return {
    name,
    tableName,
    selectableProps,
    timeout,
    create,
    update,
    destroy,
    findAll,
    find,
    findOne,
    findById,
  };
};
