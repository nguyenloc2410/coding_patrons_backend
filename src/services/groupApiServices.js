const db = require("../models/index");
const getGroupList = async () => {
  try {
    let data = await db.position.findAll();
    return {
      EM: "Get data Group Success !",
      EC: 0,
      DT: data,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong with database",
      EC: 2,
      DT: "",
    };
  }
};
module.exports = { getGroupList };
