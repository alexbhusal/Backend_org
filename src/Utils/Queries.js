const connection = require('./Db');

/*
-----------------------------------------------------------
----------------> MEMBERS QUERIES
-----------------------------------------------------------
*/

async function createMember(payload) {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO Members (name, designation, contact, facebook, tenure_year, frontpage_status, picture_id, email) VALUES (?, ?,?, ?, ?, ?, ?, ?)`;
    const values = [
      payload.name,
      payload.designation,
      payload.contact,
      payload.facebook,
      payload.tenure_year,
      payload.frontpage_status,
      payload.picture_id,
      payload.email,
    ];

    connection.query(query, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

async function getAllMembers() {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT
        Members.name,
        Members.designation,
        Members.contact,
        Members.facebook,
        Members.tenure_year,
        Members.email,
        Members.frontpage_status,
        Pictures.picture_link
    FROM Members
    JOIN Pictures ON Members.picture_id = Pictures.id
`;
    connection.query(query, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
}

/*
-----------------------------------------------------------
----------------> PICTURES QUERIES
-----------------------------------------------------------
*/
async function createPicture(payload) {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO Pictures (picture_link) VALUES (?)`;
    const values = [payload.picture_link];

    connection.query(query, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

/*
-----------------------------------------------------------
----------------> ADMIN QUERIES
-----------------------------------------------------------
*/

async function createAdminAccount(payload) {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO Admins (name, email, password) VALUES (?, ?, ?)`;
    const values = [payload.name, payload.email, payload.password];

    connection.query(query, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

async function getAdminByEmail(email) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM Admins WHERE email=(?)`;
    const value = [email];

    connection.query(query, value, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
}

async function getAdminById(id) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM Admins WHERE id=(?)`;
    const value = [id];

    connection.query(query, value, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
}

/*
-----------------------------------------------------------
----------------> NOTICE QUERIES
-----------------------------------------------------------
*/
async function registerNotice(payload) {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO Notices (name, content, from_date, to_date)
                        VALUES (?, ?, ?, ?)`;
    const values = [
      payload.name,
      payload.content,
      payload.from_date,
      payload.to_date,
    ];
    connection.query(query, values, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

async function getAllNotice() {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM Notices`;
    connection.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

/*
-----------------------------------------------------------
----------------> ADVERTISEMENT QUERIES
-----------------------------------------------------------
*/

async function registerAdvertisement(payload) {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO Advertisements (name, picture_id, from_date, to_date)
                        VALUES (?, ?, ?, ?)`;
    const values = [
      payload.name,
      payload.picture_id,
      payload.from_date,
      payload.to_date,
    ];
    connection.query(query, values, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

async function getAllAdvertisement() {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM Advertisements JOIN Pictures ON Advertisements.picture_id = Pictures.id`;
    connection.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

/*
-----------------------------------------------------------
----------------> ABOUT US QUERIES
-----------------------------------------------------------
*/

async function registerAboutUs(payload) {
  return new Promise((resolve, reject) => {
    // first delete all the previous data
    // const deleteQuery = `DELETE FROM about_us`;
    // connection.query(deleteQuery, (err, results) => {
    //   if (err) return reject(err);
    // });

    // then insert the new data
    const query = `INSERT INTO about_us (name, description) VALUES (?, ?)`;
    const values = [payload.name, payload.description];
    connection.query(query, values, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}


async function getAboutUs() {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM about_us`;
    connection.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

/*
-----------------------------------------------------------
----------------> GALLERY AND PICTURES
-----------------------------------------------------------
*/

async function createGallery(payload) {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO Galleries (event_name, description) VALUES (?, ?)`;
    const values = [payload.event_name, payload.description];
    connection.query(query, values, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

async function createGalleryPicture(payload) {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO PictureGalleries (gallery_id, picture_link) VALUES (?, ?)`;
    const values = [payload.gallery_id, payload.picture_link];
    connection.query(query, values, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

async function getGallery() {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT
        Galleries.id AS gallery_id,
        Galleries.event_name,
        Galleries.description AS gallery_description,
        PictureGalleries.id AS picture_id,
        PictureGalleries.picture_link
      FROM Galleries
      LEFT JOIN PictureGalleries ON Galleries.id = PictureGalleries.gallery_id
    `;

    connection.query(query, (err, results) => {
      if (err) return reject(err);
      const galleryMap = new Map();

      results.forEach((row) => {
        const galleryId = row.gallery_id;

        if (!galleryMap.has(galleryId)) {
          galleryMap.set(galleryId, {
            id: galleryId,
            event_name: row.event_name,
            gallery_description: row.gallery_description,
            pictures: [],
          });
        }

        if (row.picture_id) {
          galleryMap.get(galleryId).pictures.push({
            id: row.picture_id,
            picture_link: row.picture_link,
          });
        }
      });

      const galleries = Array.from(galleryMap.values());

      resolve(galleries);
    });
  });
}

module.exports = {
  createMember,
  createPicture,
  getAllMembers,
  getAdminByEmail,
  createAdminAccount,
  getAdminById,
  registerNotice,
  getAllNotice,
  registerAdvertisement,
  getAllAdvertisement,
  registerAboutUs,
  getAboutUs,
  getGallery,
  createGallery,
  createGalleryPicture,
};
