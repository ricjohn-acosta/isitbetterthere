exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          // id: 1,
          user_id: "112929919225856440659",
          name: "Ricjohn",
          email: "ricjohngenoguin@gmail.com",
          bio: "all for creating impactful projects!",
          occupation: "Unemployed",
          position: "",
          company: "",
          location: "New Zealand",
          hide_name: false,
          hide_occupation: false,
          hide_company: false,
          hide_location: false,
          comes_from: "Word of mouth",
          date_created: Date.now()
        },
      ]);
    });
};
