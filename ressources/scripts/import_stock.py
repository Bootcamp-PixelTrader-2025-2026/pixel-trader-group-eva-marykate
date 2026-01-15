# import csv

# INPUT_FILE = "output/stock_clean.csv"

# count = 0

# with open(INPUT_FILE, newline="", encoding="utf-8") as infile:
#     reader = csv.DictReader(infile)

#     for row in reader:
#         count += 1
#         print(row)  

# print("Importation du CSV validé OK")
# print(f"{count} lignes importées")
# print("Script d'import terminé sans erreur ouiiiiii")

















# import csv
# import mysql.connector
# from datetime import datetime

# db = mysql.connector.connect(
#     host="localhost",
#     user="root",
#     password="Regular001!!",
#     database="pixel_bdd"
# )

# cursor = db.cursor()

# CSV_FILE = "output/stock_clean.csv"

# with open(CSV_FILE, newline="", encoding="utf-8") as file:
#     reader = csv.DictReader(file, delimiter=";")

#     for row in reader:
#         nom = row["nom"]
#         prix = float(row["prix"].replace("€", "").replace(",", "."))
#         etat = row["etat"]
#         date_sortie = datetime.strptime(row["date_sortie"], "%Y-%m-%d").date()

#         sql = """
#         INSERT INTO stock (nom, prix, etat, date_sortie)
#         VALUES (%s, %s, %s, %s)
#         """
#         cursor.execute(sql, (nom, prix, etat, date_sortie))

# db.commit()
# cursor.close()
# db.close()

# print("Import terminé avec succès :3")
