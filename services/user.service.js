const User = require("../models/user.model");

async function findLastInsertedUser() {
  console.log("Find last inserted User");

  try {
    const result = await User.find({}).sort({ _id: -1 }).limit(1);
    console.log(result);
    return result[0];
  } catch (err) {}
}

module.exports = { findLastInsertedUser };
