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
  addRating,
  rateExperience,
  getRatedExperiences,
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
async function getExperiences(from, to, page, sort, filter, db = connection) {
  const rowsPerPage = 5;
  const currentPage = page - 1;
  let filterQuery = { from, to };
  let sortColumn = "";
  let sortDirection = "";

  switch (sort) {
    case "most-helpful":
      sortColumn = "helpful";
      sortDirection = "desc";
      break;

    case "newest":
      sortColumn = "date_posted";
      sortDirection = "desc";
      break;

    case "oldest":
      sortColumn = "date_posted";
      sortDirection = "asc";
      break;

    default:
      sortColumn = "helpful";
      sortDirection = "desc";
      break;
  }

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
    .join("users", "experiences.posted_by", "=", "users.user_id")
    .select()
    .orderBy(sortColumn, sortDirection)
    .limit(rowsPerPage)
    .offset(rowsPerPage * currentPage);

  let totalExperiences = await db("experiences").where({ from, to }).select();
  return [experiences, totalExperiences.length];
}

function getAllExperiences(from, to, db = connection) {
  return db("experiences")
    .where({ from, to })
    .join("users", "experiences.posted_by", "=", "users.user_id")
    .select();
}

function getRatedExperiences(userId, db = connection) {
  return db("experience_rating").where({ user_id: userId }).select();
}

function addRating(rating, db = connection) {
  return db("experience_rating").insert(rating);
}

function rateExperience(experience, db = connection) {
  if (experience.is_helpful) {
    return db("experiences")
      .where({ experience_id: experience.experience_id })
      .increment("helpful", 1);
  } else {
    return db("experiences")
      .where({ experience_id: experience.experience_id })
      .increment("not_helpful", 1);
  }
}

function getUserExperiences(uid, db = connection) {
  return db("experiences").where("user_id", uid);
}

function addExperience(experience, db = connection) {
  return db("experiences").insert(experience);
}
