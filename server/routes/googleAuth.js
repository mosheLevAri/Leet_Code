require("dotenv").config();
const {generateToken} = require("../services/authService.js");
const passport = require("passport");
const router = require("express").Router();
const CLIENT_URL = process.env.CLIENT_URL;
const cors = require("cors"); // Import the cors package


router.use(cors());

// Route for Google authentication
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));
  
  // Callback route for Google authentication
  router.get(
    "/google/callback",
    passport.authenticate("google", {
      successRedirect: "google/auth/login/success",
      failureRedirect: "google/auth/login/failed",
    }),
    // (req, res) => {
    //   // Generate a token and send it in the response
    //   const token = generateToken(req.user); // Implement the token generation logic
    //   res.redirect(`${CLIENT_URL}?token=${token}`);
    // }
  );




  router.get("/login/failed", (req, res) => {
    if (req.user) {

      res.status(400).json({
        success: false,
        message: "Login fails",
        user: req.user,
      });
    }
  });


  router.get("/login/success", (req, res) => {
    if (req.user) {

      res.status(200).json({
        success: true,
        message: "Login successful",
        user: req.user,
      });
    }
  });

module.exports = router;