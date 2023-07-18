require("dotenv").config();
const jwt = require("jsonwebtoken");
const { read } = require("../DL/Controller/userController");
const bcryptjs = require("bcryptjs");

const RSA_PRIVATE_KEY = process.env.Password;

function generateToken(user) {
  const token = jwt.sign({ id: user.id }, RSA_PRIVATE_KEY, {
    expiresIn: "20h",
  });

  return token;
}

async function verifyToken(req, res, next) {
  let user;
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authorization.split(" ")[1];

  try {
    user = jwt.verify(token, RSA_PRIVATE_KEY);

    req.userId = user;
    next();
  } catch (error) {
    const result = {
      status: 400,
      message: error.message || error,
    };

    return res.status(401).send(result);
  }
}

async function checkIfUserExist({ email, password }) {
  const user = (await read({ email }, "+password"))[0];

  if (!user) {
    return null;
  }

  return user;
}

async function checkPassword(user, password) {

  const isPasswordValid = bcryptjs.compareSync(password, user.password);
  if (!isPasswordValid) {
    return false;
  }

  return true;
}

module.exports = { checkIfUserExist, verifyToken, generateToken, checkPassword };
