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
async function getExperiences(from, to, page, db = connection) {
  const rowsPerPage = 5;
  const currentPage = page - 1;

  let experiences = await db("experiences")
    .where({ from, to })
    .join("users", "experiences.experience_id", "=", "users.user_id")
    .select()
    .limit(rowsPerPage)
    .offset(rowsPerPage * currentPage);

  let totalExperiences = await db("experiences").select()
  return [experiences, totalExperiences.length-1]
}

function getAllExperiences(from, to, db = connection) {
  return db("experiences")
  .where({ from, to })
  .join("users", "experiences.experience_id", "=", "users.user_id")
  .select()
}

function getUserExperiences(uid, db = connection) {
  return db("experiences").where("user_id", uid);
}

function addExperience(experience, db = connection) {
  return db("experiences").insert(experience);
}
