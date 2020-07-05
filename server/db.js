const environment = process.env.NODE_ENV || "development";
const config = require("../knexfile")[environment];
const connection = require("knex")(config);

module.exports = {
  getUser,
  getUsers,
  registerUser,
  getUserExperiences,
  getExperiences,
  getAllExperiences,
  addExperience,
  rateExperience,
};

// USERS
function getUsers(db = connection) {
  return db("users").select();
}

function getUser(id, db = connection) {
  return db("users").where("id", id).first();
}

function registerUser(user, db = connection) {
  return db("users").insert(user);
}

// EXPERIENCES
async function getExperiences(from, to, page, filter, db = connection) {
  const rowsPerPage = 5;
  const currentPage = page - 1;
  let filterQuery = { from, to };

  switch (filter) {
    case "fulfilled":
      filterQuery.fulfillment = "Fulfilled";
      break;

    case "mixed":
      filterQuery.fulfillment = "Mixed";
      break;

    case "not-fulfilled":
      filterQuery.fulfillment = "Not fulfilled";
      break;

    case "easy":
      filterQuery.ease_of_transition = "Easy";
      break;

    case "medium":
      filterQuery.ease_of_transition = "Medium";
      break;

    case "hard":
      filterQuery.ease_of_transition = "Hard";
      break;

    case "did-regret":
      filterQuery.regret = "Did regret";
      break;

    case "did-not-regret":
      filterQuery.regret = "Did not regret";
      break;

    default:
      break;
  }

  let experiences = await db("experiences")
    .where(filterQuery)
    .leftJoin("users", "experiences.posted_by", "=", "users.user_id")
    .select()
    .limit(rowsPerPage)
    .offset(rowsPerPage * currentPage);

  let ratings = await db("experience_rating").select();

  // needed to add rate count to each experience object
  experiences.map((e) =>
    ratings.filter((rating) => rating.experience_id == e.experience_id)
      .length !== 0
      ? (e.helpful = ratings.filter(
          (rating) => rating.experience_id == e.experience_id
        ).length)
      : (e.helpful = 0)
  );

  let totalExperiences = await db("experiences").where({ from, to }).select();
  return [experiences, totalExperiences.length];
}

function getAllExperiences(from, to, db = connection) {
  return db("experiences")
    .where({ from, to })
    .join("users", "experiences.posted_by", "=", "users.user_id")
    .select();
}

function rateExperience(rating, db = connection) {
  return db("experience_rating").insert(rating);
}

function getUserExperiences(uid, db = connection) {
  return db("experiences").where("user_id", uid);
}

function addExperience(experience, db = connection) {
  return db("experiences").insert(experience);
}
