const express = require("express");
const {
  handleRegister,
  handleLogin,
  handleAccount,
  handleLogOut,
} = require("../controllers/apiControl");
const {
  handleUserList,
  handleUserCreate,
  handleUserUpdate,
  handleUserDelete,
} = require("../controllers/userController");
const {
  checkUserJwt,
  checkUserPermission,
} = require("../middleware/jwtaction");
const { handleGroupList } = require("../controllers/groupController");
const router = express.Router();

const initApiRoute = (app) => {
  router.all("*", checkUserJwt, checkUserPermission);

  router.post("/register", handleRegister);
  router.post("/login", handleLogin);
  router.post("/logout", handleLogOut);
  router.get("/account", handleAccount);
  //diffents
  router.get("/user/read", handleUserList);
  router.post("/user/create", handleUserCreate);
  router.put("/user/update", handleUserUpdate);
  router.delete("/user/delete", handleUserDelete);

  //group
  router.get("/group/read", handleGroupList);

  //
  return app.use("/api/v1", router);
};
module.exports = initApiRoute;
