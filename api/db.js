const mysql = require('mysql');

const db = mysql.createConnection({
   host: "localhost",
  user: "root",
  password: "",
  database: "jeux_db"
});

db.connect(err => {
  if (err) {
    console.log('Could not connet to Databse');
  } else {
    console.log('Database connected');
  }
});

module.exports = db;
