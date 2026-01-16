const express = require('express');
const router = express.Router();
const db = require('db');

router.post('/jeux', (req, res) => {
  const {
    titre,
    annee_sortie,
    etat,
    id_emplacement,
    valeur_estimee,
    prix_achat
  } = req.body;

  db.query(
    `INSERT INTO JEUX 
     (titre, annee_sortie, etat, id_emplacement, valeur_estimee, prix_achat)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      titre,
      annee_sortie,
      etat,
      id_emplacement,
      valeur_estimee,
      prix_achat
    ],
    (error, result) => {
      if (error) {
        res.status(500).json(error);
      } else {
        res.json({ message: 'Jeu ajouté', id: result.insertId });
      }
    }
  );
});


router.get('/jeux', (req, res) => {
  db.query(
    `SELECT 
      jeux.id_jeux,
      jeux.titre,
      jeux.annee_sortie,
      jeux.etat,
      jeux.valeur_estimee,
      jeux.prix_achat,
      emplacement.nom AS emplacement,
      GROUP_CONCAT(plateforme.nom SEPARATOR ', ') AS plateformes
    FROM jeux
    JOIN emplacement ON jeux.id_emplacement = emplacement.id_emplacement
    JOIN jeux_plateforme ON jeux.id_jeux = jeux_plateforme.id_jeux
    JOIN plateforme ON jeux_plateforme.id_plateforme = plateforme.id_plateforme
    GROUP BY jeux.id_jeux`,

    (error, rows) => {
      if (error) {
        res.status(500).json(error);
      } else {
        res.json(rows);
      }
    }
  );
});


router.get('/jeux/:id', (req, res) => {
  const id = req.params.id;

  db.query(
    `SELECT 
      jeux.id_jeux,
      jeux.titre,
      jeux.annee_sortie,
      jeux.etat,
      jeux.valeur_estimee,
      jeux.prix_achat,
      emplacement.nom AS emplacement,
      GROUP_CONCAT(plateforme.nom SEPARATOR ', ') AS plateformes
    FROM jeux
    JOIN emplacement ON jeux.id_emplacement = emplacement.id_emplacement
    JOIN jeux_plateforme ON jeux.id_jeux = jeux_plateforme.id_jeux
    JOIN plateforme ON jeux_plateforme.id_plateforme = plateforme.id_plateforme
    WHERE jeux.id_jeux = ?`,
    [id],
    (error, rows) => {
      if (error) {
        res.status(500).json(error);
      } else {
        res.json(rows[0]);
      }
    }
  );
});

router.get("/emplacement", (req,res) => {
    db.query(
    "SELECT * FROM emplacement",
    (error, rows) => {
        if (error) {
            res.status(500).json(error);
        }else{
            res.json(rows);
        }
    }
    )
});

router.get("/emplacement/:id" , (req,res)=> {
    const id = req.params.id;
    db.query(
        "SELECT * FROM emplacement WHERE id_emplacement = ?",
        [id],
        (error,rows) => {
            if (error) {
                res.status(500).json(error);
            }else{
                res.json(rows[0]);
            }
        }
    )
});

router.get("/plateforme",(req,res)=>{
    db.query(
        "SELECT * FROM plateforme",
        (error,rows) => {
            if (erroe) {
                res.status.json(500);
            }else{
                res.json(rows);
            }
        }
    )
});

router.get("/plateforme/:id" , (req,res)=> {
    const id = req.params.id;
    db.query(
        "SELECT * FROM plateforme WHERE id_plateforme = ?",
        [id],
        (error,rows) => {
            if (error) {
                res.status(500).json(error);
            }else{
                res.json(rows[0]);
            }
        }
    )
});


router.put('/jeux/:id', (req, res) => {
  const id = req.params.id;
  const {
    titre,
    annee_sortie,
    etat,
    id_emplacement,
    valeur_estimee,
    prix_achat
  } = req.body;

  db.query(
    `UPDATE JEUX SET
      titre = ?,
      annee_sortie = ?,
      etat = ?,
      id_emplacement = ?,
      valeur_estimee = ?,
      prix_achat = ?
     WHERE id_jeux = ?`,
    [
      titre,
      annee_sortie,
      etat,
      id_emplacement,
      valeur_estimee,
      prix_achat,
      id
    ],
    error => {
      if (error) {
        res.status(500).json(error);
      } else {
        res.json({ message: 'Jeu modifié' });
      }
    }
  );
});


router.delete('/jeux/:id', (req, res) => {
  const id = req.params.id;

  db.query(
    'DELETE FROM JEUX WHERE id_jeux = ?',
    [id],
    error => {
      if (error) {
        res.status(500).json(error);
      } else {
        res.json({ message: 'Jeu supprimé' });
      }
    }
  );
});



module.exports = router;
