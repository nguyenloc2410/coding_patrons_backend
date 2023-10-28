var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
const db = require("../models/index");
//HASH PASSWORD
const hashUserPassWord = (pass) => {
  return bcrypt.hashSync(pass, salt);
};
const Register_Confirm = async (email, pass) => {
  const hashPass = hashUserPassWord(pass);
  try {
    await db.Users.create({
      username: email.split("@")[0],
      email: email,
      password: hashPass,
    });
  } catch (error) {
    console.log(">>>check error", error);
  }
};
const Login_Confirm = async (email, pass) => {
  const res = await db.Users.findAll({
    attributes: ["password"],
    where: { email: email },
  });
  if (res.length > 0) {
    const check = await bcrypt.compare(pass, res[0].dataValues.password);
    return check;
  }
  return 0;
};
const GetUserList = async () => {
  let newuser = await db.Users.findOne({
    where: {
      id: 3,
    },
    include: db.position,
    raw: true,
    nest: true,
  });
  console.log(">>check new user", newuser);
  return await db.Users.findAll({
    attributes: ["id", "username", "email"],
  });
};
const deleteUser = async (id) => {
  return await db.Users.destroy({
    where: {
      id: id,
    },
  });
};
const getUserById = async (id) => {
  let res = {};
  res = await db.Users.findOne({
    where: { id: id },
  });
  return res.get({ plain: true });
};
const userUpdateHandle = async (email, username, id) => {
  return await db.Users.update(
    {
      email: email,
      username: username,
    },
    {
      where: {
        id: id,
      },
    }
  );
};
module.exports = {
  Register_Confirm,
  Login_Confirm,
  GetUserList,
  deleteUser,
  getUserById,
  userUpdateHandle,
};
