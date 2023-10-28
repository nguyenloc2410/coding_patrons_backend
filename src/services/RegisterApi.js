const { Sequelize } = require("sequelize");
const db = require("../models/index");
var bcrypt = require("bcryptjs");
const { getGroupWithRoles } = require("../services/jwtservice");
const { createjwt } = require("../middleware/jwtaction");
var salt = bcrypt.genSaltSync(10);
const checkEmail = async (userEmail) => {
  let isExist = await db.Users.findOne({
    where: { email: userEmail },
  });
  if (isExist) {
    return true;
  }
  return false;
};
const checkPhone = async (userPhone) => {
  let isExist = await db.Users.findOne({
    where: { phone: userPhone },
  });
  if (isExist) {
    return true;
  }
  return false;
};
const Login_Confirm = async (email, pass) => {
  const res = await db.Users.findAll({
    attributes: ["password"],
    where: {
      email: email,
    },
  });
  if (res.length > 0) {
    const check = await bcrypt.compare(pass, res[0].dataValues.password);
    return check;
  }
  return 0;
};
const hashUserPassWord = (pass) => {
  return bcrypt.hashSync(pass, salt);
};
const registerNewUser = async (data) => {
  try {
    let isEmailExist = await checkEmail(data.email);
    if (isEmailExist) {
      return {
        EM: "The email exist",
        EC: 1,
      };
    }
    let isPhoneExist = await checkPhone(data.phone);
    if (isPhoneExist) {
      return {
        EM: "The phone exist",
        EC: 1,
      };
    }
    let hashpassword = hashUserPassWord(data.password);
    await db.Users.create({
      email: data.email,
      username: data.email.split("@")[0],
      password: hashpassword,
      phone: data.phone,
      sex: data.gender,
      address: data.address,
      positionId: 4,
    });
    return {
      EM: "Success create !",
      EC: 0,
    };
  } catch (error) {
    console.log(">>>ERROR: ", error);
    return {
      EM: "Something wrong with service",
      EC: -2,
    };
  }
};
const loginUser = async (data) => {
  try {
    let check = await Login_Confirm(data.email, data.password);
    if (check) {
      let usertmp = await db.Users.findAll({
        where: { email: data.email },
      });
      const user = usertmp[0].dataValues;
      //roles
      const role = await getGroupWithRoles(user);

      //start create token
      let payload = {
        email: user.email,
        username: user.username,
        role: role,
      };
      let token = await createjwt(payload);
      //end create token

      return {
        EM: "Login Success",
        EC: 0,
        DT: {
          access_token: token,
          roles: role,
          email: user.email,
          username: user.username,
        },
      };
    } else {
      return {
        EM: "Login Failed",
        EC: 1,
        DT: "",
      };
    }
  } catch (error) {
    console.log(">>>ERROR: ", error);
    return {
      EM: "Something wrong with service",
      EC: -2,
      DT: "",
    };
  }
};
module.exports = {
  registerNewUser,
  loginUser,
  checkEmail,
  checkPhone,
  hashUserPassWord,
};
