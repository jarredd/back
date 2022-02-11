const express = require("express");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "http://localhost:8081"
};
//app.use(cors(corsOptions));

let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, authorization');
  next();
};
app.use(allowCrossDomain);

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hola bienvenido." });
});
require("./app/routes/routes.js")(app);
//require("./app/routes/routes.js");

// set port, listen for requests
const PORT = process.env.PORT || 8080 ;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});