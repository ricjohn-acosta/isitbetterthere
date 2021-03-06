exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("experiences")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("experiences").insert([
        {
          id: 1,
          posted_by: "112929919225856440659",
          category: "universities",
          from: "University of Auckland",
          to: "Auckland University of Technology",
          fulfillment: "Fulfilled",
          ease_of_transition: "Easy",
          regret: "Did not regret",
          story: `{"blocks":[{"key":"ajk40","text":"I didn't regret it. The competition for getting into UOA's software engineering was tough and, imo, unnecessary. Got in AUT's SWE program easily so I stayed.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
          helpful: 0,
          not_helpful: 0,
          date_posted: Math.floor(Date.now() / 1000),
        },
        {
          id: 2,
          posted_by: "112929919225856440659",
          category: "careers",
          from: "Unemployed / Graduate",
          to: "Accounting",
          fulfillment: "Fulfilled",
          ease_of_transition: "Easy",
          regret: "Did not regret",
          story: `{"blocks":[{"key":"ajk40","text":"first","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
          helpful: 0,
          not_helpful: 0,
          date_posted: Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 101),
        },
        {
          id: 3,
          posted_by: "112929919225856440659",
          category: "careers",
          from: "Unemployed / Graduate",
          to: "Accounting",
          fulfillment: "Not fulfilled",
          ease_of_transition: "Medium",
          regret: "Did regret",
          story: `{"blocks":[{"key":"ajk40","text":"second","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
          helpful: 0,
          not_helpful: 0,
          date_posted: Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 101),
        },
        {
          id: 4,
          posted_by: "112929919225856440659",
          category: "careers",
          from: "Unemployed / Graduate",
          to: "Accounting",
          fulfillment: "Mixed",
          ease_of_transition: "Hard",
          regret: "Did not regret",
          story: `{"blocks":[{"key":"ajk40","text":"third","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
          helpful: 0,
          not_helpful: 0,
          date_posted: Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 101),
        },
        {
          id: 5,
          posted_by: "112929919225856440659",
          category: "careers",
          from: "Unemployed / Graduate",
          to: "Accounting",
          fulfillment: "Fulfilled",
          ease_of_transition: "Easy",
          regret: "Did not regret",
          story: `{"blocks":[{"key":"ajk40","text":"fourth","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
          helpful: 0,
          not_helpful: 0,
          date_posted: Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 101),
        },
        {
          id: 6,
          posted_by: "112929919225856440659",
          category: "careers",
          from: "Unemployed / Graduate",
          to: "Accounting",
          fulfillment: "Not fulfilled",
          ease_of_transition: "Hard",
          regret: "Did regret",
          story: `{"blocks":[{"key":"ajk40","text":"fifth","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
          helpful: 0,
          not_helpful: 0,
          date_posted: Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 101),
        },
        {
          id: 7,
          posted_by: "112929919225856440659",
          category: "careers",
          from: "Unemployed / Graduate",
          to: "Accounting",
          fulfillment: "Not fulfilled",
          ease_of_transition: "Hard",
          regret: "Did regret",
          story: `{"blocks":[{"key":"ajk40","text":"sixth","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
          helpful: 0,
          not_helpful: 0,
          date_posted: Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 101),
        },
        {
          id: 8,
          posted_by: "112929919225856440659",
          category: "careers",
          from: "Unemployed / Graduate",
          to: "Accounting",
          fulfillment: "Not fulfilled",
          ease_of_transition: "Hard",
          regret: "Did regret",
          story: `{"blocks":[{"key":"ajk40","text":"sixth","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
          helpful: 0,
          not_helpful: 0,
          date_posted: Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 101),
        },
        {
          id: 9,
          posted_by: "112929919225856440659",
          category: "careers",
          from: "Unemployed / Graduate",
          to: "Accounting",
          fulfillment: "Not fulfilled",
          ease_of_transition: "Hard",
          regret: "Did regret",
          story: `{"blocks":[{"key":"ajk40","text":"sixth","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
          helpful: 0,
          not_helpful: 0,
          date_posted: Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 101),
        },
        {
          id: 10,
          posted_by: "112929919225856440659",
          category: "careers",
          from: "Unemployed / Graduate",
          to: "Accounting",
          fulfillment: "Not fulfilled",
          ease_of_transition: "Hard",
          regret: "Did regret",
          story: `{"blocks":[{"key":"ajk40","text":"sixth","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
          helpful: 0,
          not_helpful: 0,
          date_posted: Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 101),
        },
        {
          id: 11,
          posted_by: "112929919225856440659",
          category: "careers",
          from: "Unemployed / Graduate",
          to: "Accounting",
          fulfillment: "Not fulfilled",
          ease_of_transition: "Hard",
          regret: "Did regret",
          story: `{"blocks":[{"key":"ajk40","text":"sixth","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
          helpful: 0,
          not_helpful: 0,
          date_posted: Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 101),
        },
      ]);
    });
};
