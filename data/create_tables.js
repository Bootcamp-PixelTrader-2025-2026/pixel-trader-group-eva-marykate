let mysql = require('mysql');
let con = require('con');

// let con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "jeux_db",
//   multipleStatements: true
// });

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  let sql = "CREATE TABLE emplacement (id_emplacement INT AUTO_INCREMENT PRIMARY KEY,nom VARCHAR(100) NOT NULL); CREATE TABLE plateforme (id_plateforme INT AUTO_INCREMENT PRIMARY KEY, nom VARCHAR(100) NOT NULL); CREATE TABLE jeux (id_jeux INT AUTO_INCREMENT PRIMARY KEY, titre VARCHAR(255) NOT NULL, annee_sortie VARCHAR(4), etat ENUM('Excellent', 'Bon', 'Moyen', 'Mauvais') NOT NULL, id_emplacement INT NOT NULL, valeur_estimee FLOAT, prix_achat FLOAT, FOREIGN KEY (id_emplacement) REFERENCES emplacement(id_emplacement) ON DELETE RESTRICT ON UPDATE CASCADE); CREATE TABLE jeux_plateforme (id_jeux INT NOT NULL,id_plateforme INT NOT NULL, PRIMARY KEY (id_jeux, id_plateforme), FOREIGN KEY (id_jeux) REFERENCES jeux(id_jeux) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (id_plateforme) REFERENCES plateforme(id_plateforme) ON DELETE CASCADE ON UPDATE CASCADE);";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Tables created");
  });
});