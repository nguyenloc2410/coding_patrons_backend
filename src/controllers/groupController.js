const { getGroupList } = require("../services/groupApiServices");
const handleGroupList = async (req, res) => {
  try {
    let data = await getGroupList();
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      EM: "Error !",
      EC: 1,
      DT: "",
    });
  }
};
module.exports = { handleGroupList };
