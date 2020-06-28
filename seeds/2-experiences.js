exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("experiences")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("experiences").insert([
        {
          // id: 1,
          experience_id: "112929919225856440659",
          category: "universities",
          from: "University of Auckland",
          to: "Auckland University of Technology",
          fulfillment: "Fulfilled",
          ease_of_transition: "Easy",
          regret: "Did not regret",
          story: `a`,
        },
      ]);
    });
};
