const mysql = require('mysql');

// make a connection to the database

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'organization',
});

module.exports = connection;
