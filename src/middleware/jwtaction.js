require("dotenv").config();
const nonSecurePath = ["/", "/login", "/register", "/logout"];
const jwt = require("jsonwebtoken");

const createjwt = async (payload) => {
  let key = process.env.JWT_SECRET;
  let token = null;
  try {
    token = await jwt.sign(payload, key, { expiresIn: process.env.JWT_EXPIRE });
  } catch (error) {
    console.log(error);
  }
  return token;
};

const verifyToken = (token) => {
  let data = null;
  try {
    data = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.log(error);
  }
  return data;
};

const getToken = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};

const checkUserJwt = (req, res, next) => {
  if (nonSecurePath.includes(req.path)) {
    return next();
  }
  let cookies = req.cookies;
  let tokenHeader = getToken(req);
  if ((cookies && cookies.jwt) || tokenHeader) {
    let token = cookies && cookies.jwt ? cookies.jwt : tokenHeader;
    let decoded = verifyToken(token);
    if (decoded) {
      req.user = decoded;
      req.token = token;
      next();
    } else {
      console.log("Error key or not found token");
      return res.status(401).json({
        EC: -1,
        DT: "",
        EM: "Not authenticated the user",
      });
    }
  } else {
    return res.status(401).json({
      EC: -1,
      DT: "",
      EM: "Not authenticated the user not have token jwt",
    });
  }
};

const checkUserPermission = (req, res, next) => {
  if (nonSecurePath.includes(req.path) || req.path === "/account") {
    return next();
  }
  if (req.user) {
    let email = req.user.email;
    let abilities = req.user.role.abilities;
    let currentUrl = req.path;
    if (!abilities && abilities.length === 0) {
      return res.status(403).json({
        EC: -1,
        DT: "",
        EM: "You do not have permission to access",
      });
    }
    let alowaccess = abilities.some((item) => item.url === currentUrl);
    if (alowaccess) {
      return next();
    } else {
      return res.status(403).json({
        EC: -1,
        DT: "",
        EM: "You do not have permission to access",
      });
    }
  } else {
    res.status(401).json({
      EC: -1,
      DT: "",
      EM: "Not authenticate the user",
    });
  }
};
module.exports = { createjwt, verifyToken, checkUserJwt, checkUserPermission };
