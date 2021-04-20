exports.up = (knex, Promise) => {
  return knex.schema.createTable("experience_rating", (table) => {
    table.increments("id").primary()
    table.string("user_id")
    // table.string("experience_id");
    table.integer("experience_id");
    table.boolean("is_helpful");
    table.string("date_rated");
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable("experience_rating");
};


