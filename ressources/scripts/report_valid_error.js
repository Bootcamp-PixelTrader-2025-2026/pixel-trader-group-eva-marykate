// # import csv
// # import os

// # INPUT_FILE = "output/stock_clean.csv"
// # ERROR_FILE = "output/report_valid_error.csv"

// # os.makedirs("output", exist_ok=True)

// # valid_states = ["Excellent", "Bon", "Moyen", "Mauvais"]

// # error_rows = []
// # count_total = 0

// # with open(INPUT_FILE, newline="", encoding="utf-8") as infile:
// #     reader = csv.DictReader(infile)
// #     fieldnames = reader.fieldnames + ["error"]

// #     for row in reader:
// #         count_total += 1
// #         errors = []

// #         prix = row.get("prix", "").strip()
// #         if not prix.endswith("€"):
// #             errors.append("Prix non exprimé en euros")
// #         else:
// #             try:
// #                 float(prix.replace("€", "").replace(",", "."))
// #             except ValueError:
// #                 errors.append("Prix invalide")

// #         etat = row.get("etat", "").strip()
// #         if etat not in valid_states:
// #             errors.append(f"Etat invalide: {etat}")

// #         annee_sortie = row.get("date_sortie", "").strip()
// #         if not annee_sortie:
// #             errors.append("Date de sortie manquante")

// #         if errors:
// #             row["error"] = "; ".join(errors)
// #             error_rows.append(row)

// # if error_rows:
// #     with open(ERROR_FILE, "w", newline="", encoding="utf-8") as errfile:
// #         writer = csv.DictWriter(errfile, fieldnames=fieldnames)
// #         writer.writeheader()
// #         writer.writerows(error_rows)

// #     print("CSV NON VALIDÉ ")
// #     print(f"Lignes en erreur : {len(error_rows)}")
// #     print("Rapport généré :", ERROR_FILE)
// # else:
// #     print("CSV VALIDÉ ")
// #     print(f"{count_total} lignes vérifiées sans erreur")

// # # lancer le script : python report_valid_error.py

const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const INPUT_FILE = "../output/stock_clean.csv";
const ERROR_FILE = "../output/report_valid_error.csv";

const validStates = ["Excellent", "Bon", "Moyen", "Mauvais"];

let errorRows = [];
let countTotal = 0;
let headers = [];

fs.mkdirSync("output", { recursive: true });

fs.createReadStream(INPUT_FILE)
  .pipe(csv({ separator: ";" }))
  .on("headers", (h) => {
    headers = [...h, "error"];
  })
  .on("data", (row) => {
    countTotal++;
    let errors = [];

    const prix = (row.prix || "").trim();
    if (!prix.endsWith("€")) {
      errors.push("Prix non exprimé en euros");
    } else {
      const valeur = prix.replace("€", "").replace(",", ".");
      if (isNaN(parseFloat(valeur))) {
        errors.push("Prix invalide");
      }
    }

    const etat = (row.etat || "").trim();
    if (!validStates.includes(etat)) {
      errors.push(`Etat invalide: ${etat}`);
    }

    const dateSortie = (row.annee_sortie || "").trim();
    if (!dateSortie) {
      errors.push("Date de sortie manquante");
    }

    if (errors.length > 0) {
      row.error = errors.join("; ");
      errorRows.push(row);
    }
  })
  .on("end", () => {
    if (errorRows.length > 0) {
      const writeStream = fs.createWriteStream(ERROR_FILE);
      writeStream.write(headers.join(";") + "\n");

      errorRows.forEach((row) => {
        const line = headers.map((h) => row[h] || "").join(";");
        writeStream.write(line + "\n");
      });

      writeStream.end();

      console.log("CSV NON VALIDÉ");
      console.log(`Lignes en erreur : ${errorRows.length}`);
      console.log("Rapport généré :", ERROR_FILE);
    } else {
      console.log("CSV VALIDÉ ✅");
      console.log(`${countTotal} lignes vérifiées sans erreur`);
    }
  })
  .on("error", (err) => {
    console.error("Erreur lors de la lecture du CSV :", err.message);
  });
