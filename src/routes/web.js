const express = require("express");
const {
  login,
  handleLogin_Confirm,
  userRegister,
  handleUserRegister_Confirm,
  handleDeleteUser,
  userUpdate,
  userHAndleUpdate,
} = require("../controllers/homepagecontroll");
const router = express.Router();
const instancewebroute = (app) => {
  router.get("/", login);
  router.post("/handleLogin_Confirm", handleLogin_Confirm);
  router.get("/user", userRegister);
  router.post("/user/handleUserRegister_Confirm", handleUserRegister_Confirm);
  router.post("/user/delete/:id", handleDeleteUser);
  router.get("/user/update/:id", userUpdate);
  router.post("/user/handleupdate/:id", userHAndleUpdate);
  return app.use("/", router);
};
module.exports = instancewebroute;
