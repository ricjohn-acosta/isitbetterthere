exports.up = (knex, Promise) => {
  return knex.schema.createTable("experiences", (table) => {
    // table.increments("id").primary();
    table.string("experience_id").primary;
    table.string("category");
    table.string("from");
    table.string("to");
    table.string("fulfillment");
    table.string("ease_of_transition");
    table.string("regret");
    table.string("story", 5000);
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable("experiences");
};
