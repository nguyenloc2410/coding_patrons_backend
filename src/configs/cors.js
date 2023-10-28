require("dotenv").config();
const cors = require("cors");

const secureCors = (app) => {
  app.use(
    cors({
      origin: process.env.ALLOW_WEB,
      credentials: true,
    })
  );
};
module.exports = secureCors;
