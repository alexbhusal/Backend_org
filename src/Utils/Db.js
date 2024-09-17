const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

// make a connection to the database
const connection = mysql.createConnection({
  host: "bxezlhok07t874n9bmul-mysql.services.clever-cloud.com",
  user: "uqzxxwzcfcakrpk6",
  password: "iUDL7lVkgqXAA8i1Zwxn",
  database: "bxezlhok07t874n9bmul"
  
  // host: process.env.Host,
  // user: process.env.User,
  // password: process.env.Password,
  // database: process.env.Database
});

module.exports = connection;
