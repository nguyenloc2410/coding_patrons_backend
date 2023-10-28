const {
  Register_Confirm,
  Login_Confirm,
  GetUserList,
  deleteUser,
  getUserById,
  userUpdateHandle,
} = require("../services/userService");

const login = (req, res) => {
  return res.render("login.ejs");
};
const handleLogin_Confirm = async (req, res) => {
  let email = req.body.email;
  let pass = req.body.pass;
  const result = await Login_Confirm(email, pass);
  if (result) {
    return res.send("Login Success");
  } else {
    return res.send("Login Failed");
  }
};
const userRegister = async (req, res) => {
  const userList = await GetUserList();
  return res.render("user.ejs", { userList });
};

const handleUserRegister_Confirm = async (req, res) => {
  let email = req.body.email;
  let pass = req.body.pass;
  await Register_Confirm(email, pass);
  return res.redirect("/user");
};
const handleDeleteUser = async (req, res) => {
  let id = req.params.id;
  await deleteUser(id);
  return res.redirect("/user");
};
const userUpdate = async (req, res) => {
  const id = req.params.id;
  const user = await getUserById(id);
  let userData = {};
  if (user) {
    userData = user;
  }
  res.render("userUpdate.ejs", { userData });
};
const userHAndleUpdate = async (req, res) => {
  const id = req.params.id;
  const email = req.body.email;
  const username = req.body.username;
  await userUpdateHandle(email, username, id);
  return res.redirect("/user");
};
module.exports = {
  login,
  handleLogin_Confirm,
  userRegister,
  handleUserRegister_Confirm,
  handleDeleteUser,
  userUpdate,
  userHAndleUpdate,
};
