exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("experiences")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("experiences").insert([
        {
          id: 1,
          uid: "1",
          category: "Careers",
          from: "Unemployed / Graduate",
          to: "Accounting",
          story:
            "Promotion an ourselves up otherwise my. High what each snug rich far yet easy. In companions inhabiting mr principles at insensible do. Heard their sex hoped enjoy vexed child for. Prosperous so occasional assistance it discovered especially no. Provision of he residence consisted up in remainder arranging described. Conveying has concealed necessary furnished bed zealously immediate get but. Terminated as middletons or by instrument. Bred do four so your felt with. No shameless principle dependent household do",
        },
      ]);
    });
};
