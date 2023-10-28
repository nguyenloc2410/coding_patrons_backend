const { registerNewUser, loginUser } = require("../services/RegisterApi");
const handelSendApi = (req, res) => {
  return res.status(200).json({
    message: "ok",
    data: "testapi",
  });
};
const handleRegister = async (req, res) => {
  try {
    if (!req.body.email || !req.body.phone || !req.body.password) {
      return res.status(200).json({
        EM: "Missing required informations",
        EC: "-1",
        DT: "",
      });
    }
    let data = await registerNewUser(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: "",
    });
  } catch (error) {
    return res.status(500).json({
      EM: "Error from server",
      EC: "-1",
      DT: "",
    });
  }
};
const handleLogin = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(200).json({
        EM: "Missing required informations",
        EC: "-1",
        DT: "",
      });
    }
    let data = await loginUser(req.body);
    try {
      res.cookie("jwt", data.DT.access_token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
        sameSite: "none",
        secure: true,
      });
    } catch (error) {
      console.log("ko the set cookie", error);
    }
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    return res.status(200).json({
      EM: "Error from server",
      EC: "-1",
      DT: "",
    });
  }
};
const handleAccount = async (req, res) => {
  return res.status(200).json({
    EM: "Refesh !!!",
    EC: 0,
    DT: {
      access_token: req.token,
      user: req.user,
    },
  });
};

const handleLogOut = async (req, res) => {
  try {
    await res.clearCookie("jwt");
    return res.status(200).json({
      EM: "Log Out Success",
      EC: 0,
      DT: "",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Something wrong with server",
      EC: -1,
      DT: "",
    });
  }
};
module.exports = {
  handelSendApi,
  handleRegister,
  handleLogin,
  handleAccount,
  handleLogOut,
};
