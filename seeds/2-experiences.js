exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("experiences")
    .del()
    .then(function () {
      // Inserts seed entries
      const story = JSON.parse(`{"blocks":[{"key":"ajk40","text":"My transition from UOA to AUT was well worth it. I moved mainly because I didn't get in my desired engineering specialization which is Software Engineering. I do believe that there really shouldn't be any restrictions when it comes to choosing a specialization and so I looked at Software Engineering in AUT. Atmosphere wise I really like AUT's because everyone seems friendly and gives out a closely-knit community vibe. Cross-crediting the papers I finished in UoA was also a relatively easy task to do in AUT so it's a really easy transition in that regard. The enrolment process was quick and simple and I got in the software engineering program the following semester.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`)
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
          story: story,
        },
      ]);
    });
};
