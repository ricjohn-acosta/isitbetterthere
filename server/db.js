const environment = process.env.NODE_ENV || "development";
const config = require("../knexfile")[environment];
const connection = require("knex")(config);

module.exports = {
  getUser,
  editUser,
  getUsers,
  getUserExperiences,
  getExperiences,
  getAllExperiences,
  getRatedExperiences,
  getReportedExperiences,
  getUserExperiences,
  getAllUserExperiences,
  getUserRatedExperiences,
  editExperience,
  addExperience,
  addRating,
  addReport,
  getReport,
  registerUser,
  rateExperience,
  deleteExperience,
};

// USERS
function getUsers(db = connection) {
  return db("users").select();
}

function getUser(userId, db = connection) {
  return db("users").where("user_id", userId).first();
}

function editUser(userData, db = connection) {
  let { user_id: userId, ...details } = userData;
  return db("users").where("user_id", userId).update(details);
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

function getAllUserExperiences(db = connection) {
  return db("experiences").select();
}

function getUserExperiences(user, db = connection) {
  return db("experiences").where({ posted_by: user }).select();
}

function getUserRatedExperiences(userId, db = connection) {
  return db("experience_rating")
    .from("experience_rating AS exr")
    .leftJoin("experiences AS ex", "ex.experience_id", "exr.experience_id")
    .leftJoin("users AS us", "us.user_id", "ex.posted_by")
    .where("exr.user_id", "=", userId)
    .select();
}

function getRatedExperiences(user_id, db = connection) {
  return db("experience_rating").where({ user_id }).select();
}

function getReportedExperiences(reported_by, db = connection) {
  return db("flagged_experiences").where({ reported_by }).select();
}

async function addRating(rating, db = connection) {
  const ratingExists = await db("experience_rating").where({
    user_id: rating.user_id,
    experience_id: rating.experience_id
  });

  console.log("RATING EXISTS", ratingExists);
  if (ratingExists.length !== 0) {
    return db("experience_rating").where({experience_id: rating.experience_id}).update({ is_helpful: rating.is_helpful });
  } else {
    return db("experience_rating").insert(rating);
  }
}

async function rateExperience(experience, db = connection) {
  if (experience.is_helpful) {
    await db("experiences")
      .where({ experience_id: experience.experience_id })
      .andWhere("not_helpful", ">", 0)
      .decrement("not_helpful", 1);
    return db("experiences")
      .where({ experience_id: experience.experience_id })
      .increment("helpful", 1);
  } else {
    await db("experiences")
      .where({ experience_id: experience.experience_id })
      .increment("not_helpful", 1);
    return db("experiences")
      .where({ experience_id: experience.experience_id })
      .andWhere("helpful", ">", 0)
      .decrement("helpful", 1);
  }
}

function addExperience(experience, db = connection) {
  return db("experiences").insert(experience);
}

function editExperience(experience, db = connection) {
  let { experience_id: experienceId, ...story } = experience;
  return db("experiences").where({ experience_id: experienceId }).update(story);
}

function deleteExperience(experienceId, db = connection) {
  return db("experiences").where(experienceId).del();
}

function addReport(report, db = connection) {
  return db("flagged_experiences").insert(report);
}

function getReport(report, db = connection) {
  return db("flagged_experiences").where(report).select();
}
