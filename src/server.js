const express = require("express");
require("dotenv").config();
const configViewEngine = require("./configs/viewEngine");
const instancewebroute = require("./routes/web");
var bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const connection = require("../src/configs/databaseOrm");
const port = process.env.SERVER_PORT || 8888;
const initApiRoute = require("../src/routes/api");
const secureCors = require("./configs/cors");
const app = express();
//config Cors secure
secureCors(app);
//config data read from web
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("trust proxy", 1);
//database
connection();

//config viewEngine
configViewEngine(app);

//Routes
instancewebroute(app);
initApiRoute(app);

//listen port
app.listen(port, () => {
  console.log(`JWT app listening on port ${port}`);
});
