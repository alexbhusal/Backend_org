const mysql = require('mysql');
// require('dotenv').config();

// Create a connection to MySQL (for database creation)
const createConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
});

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'organization',
});

async function setupDatabase() {
  const createDbQuery = `CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE};`;

  try {
    await new Promise((resolve, reject) => {
      createConnection.connect((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    console.log('Connected to MySQL server.');

    await new Promise((resolve, reject) => {
      createConnection.query(createDbQuery, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    console.log(
      `Database ${process.env.DB_DATABASE} created or already exists.`
    );

    await new Promise((resolve, reject) => {
      connection.connect((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    console.log('Connected to the database.');

    const createTablesQueries = [
      `CREATE TABLE IF NOT EXISTS Pictures (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    picture_link VARCHAR(255) NOT NULL
  );`,
      `CREATE TABLE IF NOT EXISTS Admins (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
  );`,
      `CREATE TABLE IF NOT EXISTS Members (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    designation VARCHAR(255),
    contact VARCHAR(20),
    facebook VARCHAR(255),
    tenure_year VARCHAR(10),
    frontpage_status BOOLEAN DEFAULT FALSE,
    picture_id INT UNSIGNED,
    FOREIGN KEY (picture_id) REFERENCES Pictures(id) ON DELETE SET NULL
  );`,
      `CREATE TABLE IF NOT EXISTS Advertisements (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    picture_id INT UNSIGNED,
    content TEXT,
    from_date DATE,
    to_date DATE,
    FOREIGN KEY (picture_id) REFERENCES Pictures(id)
  );`,
      `CREATE TABLE IF NOT EXISTS Notices (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    content TEXT,
    from_date DATE,
    to_date DATE
  );`,
      `CREATE TABLE IF NOT EXISTS Galleries (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    event_name VARCHAR(255) NOT NULL,
    description TEXT
  );`,
      `CREATE TABLE IF NOT EXISTS PictureGalleries (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    gallery_id INT UNSIGNED,
    picture_link VARCHAR(255) NOT NULL,
    FOREIGN KEY (gallery_id) REFERENCES Galleries(id)
  );`,
      `CREATE TABLE IF NOT EXISTS about_us (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
  );`,
    ];

    for (const query of createTablesQueries) {
      await new Promise((resolve, reject) => {
        connection.query(query, (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    }
    console.log('Tables created or already exist.');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close connections
    createConnection.end();
    connection.end();
  }
}

setupDatabase();
