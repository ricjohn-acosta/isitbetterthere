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

// Change this to return db("experiences").where({from,to}).join("users", "experiences.eid", "=", "users.uid").select()
function getExperiences(from, to, db = connection) {
  // return db("experiences").where({ from, to }).select();
  return db("experiences")
    .where({ from, to })
    .join("users", "experiences.eid", "=", "users.uid")
    .select();
}

function getUserExperiences(uid, db = connection) {
  return db("experiences").where("uid", uid);
}

function addExperience(experience, db = connection) {
  return db("experiences").insert(experience);
}
