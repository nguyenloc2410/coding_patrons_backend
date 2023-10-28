const {
  getUserList,
  createAUSer,
  updateAUser,
  deleteAUser,
  getUserPage,
} = require("../services/userApiServices");
const handleUserList = async (req, res) => {
  try {
    if (req.query.page && req.query.limit) {
      let page = req.query.page;
      let limit = req.query.limit;
      let data = await getUserPage(+page, +limit);
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } else {
      return res.status(500).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    }
    // let data = await getUserList();
    // if (data.EC === 1) {
    //   return res.status(500).json({
    //     EM: data.EM,
    //     EC: data.EC,
    //     DT: data.DT,
    //   });
    // }
    // return res.status(200).json({
    //   EM: data.EM,
    //   EC: data.EC,
    //   DT: data.DT,
    // });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};
const handleUserCreate = async (req, res) => {
  try {
    const user = req.body.user;
    let data = await createAUSer(user);
    if (data.EC === 0) {
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } else {
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};
const handleUserUpdate = async (req, res) => {
  const user = req.body.user;
  try {
    let data = await updateAUser(user);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};
const handleUserDelete = async (req, res) => {
  const id = req.body.id;
  try {
    let data = await deleteAUser(id);
    if (data.EC === 0) {
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } else {
      return res.status(500).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};
module.exports = {
  handleUserList,
  handleUserCreate,
  handleUserUpdate,
  handleUserDelete,
};
