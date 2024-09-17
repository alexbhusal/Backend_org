const app = require('./src/app');
const db_connection = require('./src/Utils/Db');


const PORT = process.env.PORT || 3000;
const HOST = 'localhost';

app.listen(PORT, HOST, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`);
  db_connection.connect((err) => {
    if (err) {
      console.log('Error connecting to Db');
      return;
    }
    console.log('Dabatase Connection Established..');
  });
});
