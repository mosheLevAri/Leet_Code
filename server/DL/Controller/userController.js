const User = require("../Model/userModel.js");
const bcryptjs = require("bcryptjs");
process.env.TZ = "Asia/Jerusalem";

const usersCache = new Map();

async function register(data) {
  return User.create(data);
}

async function read(filter = {}, projection) {
  const cacheKey = JSON.stringify(filter);
  let user;

  if (usersCache.has(cacheKey)) {
    return usersCache.get(cacheKey);
  }

  try {
    user = await User.find(filter, projection);
    usersCache.set(cacheKey, user);
  } catch (error) {
    return null;
  }

  return user;
}

async function update(_id, data) {
  return await User.findByIdAndUpdate(_id, data, {
    new: true,
    runValidators: true,
  });
}

module.exports = { register, update, read };
