exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("experiences")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("experiences").insert([
        {
          experience_id: "112929919225856440659",
          category: "universities",
          from: "University of Auckland",
          to: "Auckland University of Technology",
          fulfillment: "Fulfilled",
          ease_of_transition: "Easy",
          regret: "Did not regret",
          story: `{"blocks":[{"key":"ajk40","text":"I didn't regret it. The competition for getting into UOA's software engineering was tough and, imo, unnecessary. Got in AUT's SWE program easily so I stayed.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
          helpful: 12,
          not_helpful: 0,
          date_posted: Date.now(),
        },
        {
          experience_id: "112929919225856440659",
          category: "careers",
          from: "Unemployed / Graduate",
          to: "Accounting",
          fulfillment: "Fulfilled",
          ease_of_transition: "Easy",
          regret: "Did not regret",
          story: `{"blocks":[{"key":"ajk40","text":"first","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
          helpful: 12,
          not_helpful: 0,
          date_posted: 1519211809934,
        },
        {
          experience_id: "112929919225856440659",
          category: "careers",
          from: "Unemployed / Graduate",
          to: "Accounting",
          fulfillment: "Fulfilled",
          ease_of_transition: "Easy",
          regret: "Did not regret",
          story: `{"blocks":[{"key":"ajk40","text":"second","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
          helpful: 4,
          not_helpful: 0,
          date_posted: 1519211810362,
        },
        {
          experience_id: "112929919225856440659",
          category: "careers",
          from: "Unemployed / Graduate",
          to: "Accounting",
          fulfillment: "Fulfilled",
          ease_of_transition: "Easy",
          regret: "Did not regret",
          story: `{"blocks":[{"key":"ajk40","text":"third","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
          helpful: 41,
          not_helpful: 0,
          date_posted: 1519211811670,
        },
      ]);
    });
};
