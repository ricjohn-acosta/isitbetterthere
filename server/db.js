const environment = process.env.NODE_ENV || "development";
const config = require("../knexfile")[environment];
const connection = require("knex")(config);

module.exports = {
  getUser,
  getUsers,
  registerUser,
  getUserExperiences,
  getExperiences,
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
function getExperiences(from, to, currentPage, db = connection) {
  const rowsPerPage = 10;
  return db("experiences")
    .where({ from, to })
    .join("users", "experiences.experience_id", "=", "users.user_id")
    .select()
    .limit(rowsPerPage)
    .offset(rowsPerPage * currentPage)
}

function getUserExperiences(uid, db = connection) {
  return db("experiences").where("user_id", uid);
}

function addExperience(experience, db = connection) {
  return db("experiences").insert(experience);
}
