exports.up = (knex, Promise) => {
  return knex.schema.createTable("experiences", (table) => {
    table.increments("id").primary();
    table.string("eid");
    table.string("category");
    table.string("from");
    table.string("to");
    table.string("story");
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable("experiences");
};
