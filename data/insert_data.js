const mysql = require('mysql');
const jsonData = require('../csv_cleaner/stock.json');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "jeux_db"
});

const query = (sql, values = []) => {
  return new Promise((resolve, reject) => {
    con.query(sql, values, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

con.connect(async (err) => {
  if (err) {
    console.error("MySQL connection error:", err);
    return;
  }
  console.log("Connected to MySQL!");

  const cleanedData = jsonData.map(item => {
    const key = Object.keys(item)[0];
    const values = item[key].split(';');

    return {
      id: values[0],
      titre_jeu: values[1],
      plateforme: values[2],
      annee_sortie: values[3],
      etat: values[4],
      emplacement: values[5],
      valeur_estimee: parseFloat(values[6].replace('€','').trim()),
      prix_achat: parseFloat(values[7].replace('€','').trim())
    };
  });

  try {
    for (const item of cleanedData) {
      const emplacementName = item.emplacement?.trim();
      const plateformeName = item.plateforme?.trim();

      if (!emplacementName || !plateformeName) {
        console.log(`Empty emplacement or plateforme: ${item.titre_jeu}`);
        continue;
      }

      await query("INSERT IGNORE INTO emplacement (nom) VALUES (?)", [emplacementName]);

      const emplacementRows = await query(
        "SELECT id_emplacement FROM emplacement WHERE TRIM(nom) = ?",
        [emplacementName]
      );
      if (!emplacementRows.length) throw new Error(`Emplacement not found: ${emplacementName}`);
      const id_emplacement = emplacementRows[0].id_emplacement;

      await query("INSERT IGNORE INTO plateforme (nom) VALUES (?)", [plateformeName]);

      const plateformeRows = await query(
        "SELECT id_plateforme FROM plateforme WHERE TRIM(nom) = ?",
        [plateformeName]
      );
      if (!plateformeRows.length) throw new Error(`Plateforme not found: ${plateformeName}`);
      const id_plateforme = plateformeRows[0].id_plateforme;

      const jeuxResult = await query(
        `INSERT INTO jeux 
         (titre, annee_sortie, etat, id_emplacement, valeur_estimee, prix_achat)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          item.titre_jeu,
          item.annee_sortie,
          item.etat,
          id_emplacement,
          item.valeur_estimee,
          item.prix_achat
        ]
      );
      const id_jeux = jeuxResult.insertId;

      await query(
        "INSERT IGNORE INTO jeux_plateforme (id_jeux, id_plateforme) VALUES (?, ?)",
        [id_jeux, id_plateforme]
      );

      console.log(`Inserted: ${item.titre_jeu}`);
    }

    console.log("All data inserted successfully!");
  } catch (err) {
    console.error("Error inserting data:", err);
  } finally {
    con.end();
  }
});
