require("dotenv").config();
const path = require("path");
const nodemailer = require("nodemailer");
const mailGen = require("mailgen");
const bcryptjs = require("bcryptjs");
const { register, read } = require("../../DL/Controller/userController.js");
const {
  generateToken,
  checkIfUserExist,
  checkPassword,
} = require("../../services/authService.js");

async function userRegister(req, res) {
  try {
    const { email, password } = req.body;

    const existingUser = await checkIfUserExist({ email, password });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = bcryptjs.hashSync(password);
    req.body.password = hashedPassword;

    const user = await register(req.body);
    const token = generateToken(user);



    /**/ 
    res.status(200).send({ token });
  } catch (error) {
    const result = {
      status: 400,
      message: error.message || error,
    };
    res.status(400).send(result);
  }
}

async function userLogin(req, res) {
  try {
    const { email, password } = req.body;

    const user = await checkIfUserExist({ email, password });
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isSamePassword = checkPassword(user, password);
    if (!isSamePassword) {
      throw new Error("Invalid email or password");
    }

    const token = generateToken(user);

    res.status(200).send({ token });
  } catch (error) {
    const result = {
      status: 400,
      message: error.message || error,
    };
    res.status(400).send(result);
  }
}

async function getAllUsers(req, res) {
  try {
    let users;
    const userId = req.query.id;

    if (userId) {
      users = await read({ _id: userId });
    } else {
      users = await read();
    }

    res.status(200).send(users);
  } catch (error) {
    const result = {
      status: 400,
      message: error.message || error,
    };
    res.status(400).send(result);
  }
}

function userLogout(req, res) {
  req.logOut();
  res.redirect(CLIENT_URL);
}

function loginFaild(req, res) {
  res.status(401).json({
    success: false,
    message: "failure",
  });
}

/*  send mail to user after registration (not connect need to integrate) */
const EMAIL_CONFIG = {
  service: "gmail",
  auth: {
    user: process.env.MyEmail,
    pass: process.env.Password,
  },
};
class EmailService {
  constructor(userEmail, data) {
    this.userEmail = userEmail;
    this.data = data;
  }

  EmailService(res) {
    const transporter = nodemailer.createTransport(EMAIL_CONFIG);

    const mailGenerator = new mailGen({
      theme: "default",
      product: {
        name: "Mailgen",
        link: "http://mailgen.js/",
      },
    });

    const response = {
      body: {
        intro: this.data,
      },
    };

    const mail = mailGenerator.generate(response);

    const message = {
      from: "8668871@gmail.com",
      to: this.userEmail,
      subject: "Hey is Moshe Lev-Ari 👋",
      html: mail,
    };

    transporter
      .sendMail(message)
      .then(() => {
        res.status(201).json({
          msg: "You should receive an email.",
        });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  }
}

module.exports = {
  userRegister,
  userLogin,
  userLogout,
  loginFaild,
  getAllUsers,
};
