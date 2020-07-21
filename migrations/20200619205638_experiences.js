exports.up = (knex, Promise) => {
  return knex.schema.createTable("experiences", (table) => {
    // table.increments("experience_id").primary();
    table.increments("id").primary()
    // table.string("experience_id")
    table.string("posted_by")
    table.string("category");
    table.string("from");
    table.string("to");
    table.string("fulfillment");
    table.string("ease_of_transition");
    table.string("regret");
    table.text("story");
    table.integer("helpful")
    table.integer("not_helpful")
    table.integer("date_posted")
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable("experiences");
};
