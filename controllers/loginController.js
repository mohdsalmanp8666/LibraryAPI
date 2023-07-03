const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const userModel = require("../models/User");
const md5 = require("md5");

module.exports = function (req, res) {
  console.log(req.body);
  userModel
    .findOne({
      attributes: { exclude: ["password"] },
      where: {
        email: req.body.sid,
        password: req.body.password,
      },
    })
    .then((data) => {
      if (data !== null) {
        jwt.sign(
          { data },
          process.env.KEY,
          { expiresIn: "12h" },
          (err, token) => {
            console.log("Login successfull!");
            res.status(200).json({
              result: true,
              message: "Login successfull!",
              token,
              // data,
            });
          }
        );
      } else {
        console.log("No user found");
        res.status(403).json({
          result: false,
          message: "No user found",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        result: false,
        message: "Something went wrong while logging in",
        error: err,
      });
    });
};
