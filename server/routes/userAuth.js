require("dotenv").config();
const router = require("express").Router();
const {
  userRegister,
  userLogin,
  userLogout,
  loginFaild
} = require("../BL/Logic/user.js");
const { generateToken, verifyToken } = require("../services/authService.js");

// Route for user registration
router.post("/register", userRegister);

// Route for user login
router.post("/login", userLogin);

// Route for failed login attempt
router.get("/login/failed", loginFaild);

// Route for user logout 
router.get("/logout",userLogout);


module.exports = router; 