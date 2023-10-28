const { where } = require("sequelize");
const db = require("../models/index");
const {
  checkEmail,
  checkPhone,
  hashUserPassWord,
} = require("../services/RegisterApi");

const getUserList = async () => {
  try {
    let user = await db.Users.findAll({
      attributes: ["id", "username", "email", "phone", "sex", "address"],
      include: { model: db.position, attributes: ["name", "description"] },
    });
    if (user) {
      return {
        EM: "Get data success !",
        EC: 0,
        DT: user,
      };
    } else {
      return {
        EM: "Get data success !",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong with server/database",
      EC: 1,
      DT: [],
    };
  }
};
const getUserPage = async (page, limit) => {
  try {
    const offset = (page - 1) * limit;
    const { count, rows } = await db.Users.findAndCountAll({
      offset: offset,
      limit: limit,
      attributes: ["id", "username", "email", "phone", "sex", "address"],
      include: {
        model: db.position,
        attributes: ["name", "description", "id"],
      },
    });
    let data = {
      totalPages: Math.ceil(count / limit),
      count: count,
      users: rows,
    };
    return {
      EM: "Get Success",
      EC: 0,
      DT: data,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong with server/database",
      EC: 1,
      DT: [],
    };
  }
};
const createAUSer = async (user) => {
  try {
    let isEmailExist = await checkEmail(user.email);
    console.log(isEmailExist);
    if (isEmailExist) {
      return {
        EM: "The email exist",
        EC: 1,
        DT: "email",
      };
    }
    let isPhoneExist = await checkPhone(user.phone);
    console.log(isPhoneExist);
    if (isPhoneExist) {
      return {
        EM: "The phone exist",
        EC: 1,
        DT: "phone",
      };
    }
    const hashpass = hashUserPassWord(user.password);
    await db.Users.create({ ...user, password: hashpass });
    return {
      EM: "Create Success",
      EC: 0,
      DT: [],
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong with server/database",
      EC: 1,
      DT: [],
    };
  }
};
const updateAUser = async (user) => {
  try {
    await db.Users.update(
      {
        username: user.username,
        address: user.address,
        sex: user.gender,
        positionId: user.position,
      },
      {
        where: { id: user.id },
      }
    );
    return {
      EM: "Update Success",
      EC: 0,
      DT: "",
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong with database/service",
      EC: 1,
      DT: "",
    };
  }
};
const deleteAUser = async (id) => {
  console.log(id);
  try {
    const user = await db.Users.findOne({
      where: {
        id: id,
      },
    });
    if (user) {
      await user.destroy();
      return {
        EM: "Delete Success!",
        EC: 0,
        DT: "",
      };
    } else {
      return {
        EM: "Not found User",
        EC: 1,
        DT: "",
      };
    }
  } catch (error) {
    return {
      EM: "Something wrong with database",
      EC: 2,
      DT: "",
    };
  }
};
module.exports = {
  getUserList,
  createAUSer,
  updateAUser,
  deleteAUser,
  getUserPage,
};
