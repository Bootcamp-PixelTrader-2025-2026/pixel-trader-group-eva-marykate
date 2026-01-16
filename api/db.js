const mysql = require('mysql');

const db = mysql.createConnection({
   host: "localhost",
  user: "root",
  password: "Regular001!!",
  database: "pixel_bdd"
});

db.connect(err => {
  if (err) {
    console.log('Could not connet to Databse');
  } else {
    console.log('Database connected');
  }
});

module.exports = db;
