let mysql = require('mysql');

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  multipleStatements: true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE jeux_db", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});
