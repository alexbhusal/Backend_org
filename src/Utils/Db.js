const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

// make a connection to the database
const connection = mysql.createConnection({
  host: "bud5jisgxhg7maqm3uog-mysql.services.clever-cloud.com",
  user: "ucazaarbbmw0axy5",
  password: "jNjjoXHunmMsX3xw6sTt",
  database: "bud5jisgxhg7maqm3uog"
  
  // host: process.env.Host,
  // user: process.env.User,
  // password: process.env.Password,
  // database: process.env.Database
});

module.exports = connection;
