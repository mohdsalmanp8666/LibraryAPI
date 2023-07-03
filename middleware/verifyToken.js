const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

function verifyToken(req, res, next) {
  console.log("Inside verify token");
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;
    jwt.verify(req.token, process.env.KEY, (err, authData) => {
      if (err) {
        console.log("Stuck inside verify token");
        res.status(401).json({
          result: false,
          message: "Invalid Token",
          error: err,
        });
      } else {
        next();
      }
    });
  } else {
    console.log("Stuck inside verify token");
    res.status(401).json({
      result: false,
      message: "token is not valid",
    });
  }
}

module.exports = verifyToken;
