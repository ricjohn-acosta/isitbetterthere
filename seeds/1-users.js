exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          // id: 1,
          user_id: "1",
          name: "admin",
          email: "admin@admin.com",
          bio: "I'm an admin",
          occupation: "Employed",
          position: "Nurse",
          company: "Auckland Hospital",
          location: "Glenfield, Auckland, New Zealand",
          hide_name: false,
          hide_occupation: false,
          hide_company: false,
          hide_location: false,
          comes_from: "LinkedIn",
          date_created: Date.now()
        },
      ]);
    });
};
