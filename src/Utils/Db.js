const mysql = require('mysql');
const dotenv = require('dotenv')
dotenv.config()


// make a connection to the database

const connection = mysql.createConnection({
  // host: "localhost",
  // user: "root",
  // password: "",
  // database: "organization"

  host: process.env.Host,
  user: process.env.User,
  password: process.env.Password,
  database: process.env.Database

});

module.exports = connection;
