exports.up = (knex, Promise) => {
    return knex.schema.createTable("flagged_experiences", (table) => {
      table.increments("id").primary();
      table.string("reported_by");
      // table.string("experience_id");
      table.integer("experience_id")
      table.boolean("violation_type");
      table.integer("date_reported");
    });
  };
  
  exports.down = (knex, Promise) => {
    return knex.schema.dropTable("flagged_experiences");
  };
  