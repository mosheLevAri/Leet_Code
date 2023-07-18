require("dotenv").config();
require("./services/passport");
const { connectDB, disconnectDB } = require("./config/connectionDB.js");
const path = require("path");
const session = require("express-session");
const express = require("express");
const userAuth = require("./routes/userAuth.js");
const googleAuth = require("./routes/googleAuth.js");
const exercises = require("./routes/exercise.js");
const executExercise = require("./routes/executExercise.js");

const cookieSession = require("cookie-session");
const passport = require("passport");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = 3000;
    this.mongoUrl = process.env.CONNECTION_STRING;
    this.setupMiddleware();
    this.setupRoutes();
  }

  setupMiddleware() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.use(
      session({
        secret: "secret",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
      })
    );
  }


  

  setupRoutes() {
    // const userModel = mongoose.model('User', UserModel);
    // const userDb = new UserDb(userModel);
    // const userService = new UserService(userDb);
    // const userController = new UserController(userService);

    this.app.use("/user", userAuth);
    this.app.use("/auth", googleAuth);
    this.app.use("/exercises", exercises);
    this.app.use("/executExercise", executExercise);
  }

  async connectToDatabase() {
    await connectDB(this.mongoUrl);
  }

  startListening() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
}

const server = new Server();
server
  .connectToDatabase()
  .catch((error) => console.error("Server error:", error));

server.startListening();

module.exports = {
  server,
};
