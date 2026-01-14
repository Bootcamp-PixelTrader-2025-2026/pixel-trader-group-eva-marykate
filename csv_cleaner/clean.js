const fs = require("fs");
const csv = require("csv-parser");
const { createObjectCsvWriter } = require("csv-writer");
let platformCorrected;

const CSV_SEPARATOR = ";";

const VALID_STATES = ["Excellent", "Bon", "Moyen", "Mauvais"];

const CURRENCY_RATES = {
  EUR: 1,
  "€": 1,
  USD: 0.92,
  "$": 0.92,
  YEN: 0.006,
  "¥": 0.006
};


const cleanedGames = [];
const gamesMissingYear = [];

function convertPriceToEuro(textPrice) {
  if (!textPrice || textPrice === "NULL") {
    return null;
  }

  const numberOnly = parseFloat(
    textPrice
      .replace(",", ".")
      .replace(/[^0-9.]/g, "")
  );

  if (isNaN(numberOnly)) {
    return null;
  }

  let currency = "EUR";

  if (textPrice.includes("$")) currency = "USD";
  if (textPrice.includes("¥") || textPrice.toUpperCase().includes("YEN")) currency = "YEN";
  if (textPrice.toUpperCase().includes("EUR") || textPrice.includes("€")) currency = "EUR";

  const euroValue = +(numberOnly * CURRENCY_RATES[currency]).toFixed(2);

  return euroValue + " €";
}

function cleanPlatform(input) {
  if (!input) return 'UNKNOWN';

  const map = {
    'playstation': 'PS1',
    'playstation 1': 'PS1',
    'ps1': 'PS1',
    'psx': 'PS1',

    'playstation 2': 'PS2',
    'ps2': 'PS2',

    'ps3': 'PS3',

    'nintendo 64': 'N64',
    'n64': 'N64',

    'super nintendo': 'SNES',
    'snes': 'SNES',

    'nes': 'NES',

    'gameboy': 'GB',
    'game boy': 'GB',

    'gameboy color': 'GBC',

    'gba': 'GBA',
    'game boy advance': 'GBA',

    'gamecube': 'GC',
    'gcn': 'GC',
    'gc': 'GC',

    'switch': 'SWITCH',

    'sega mega drive': 'MD',
    'megadrive': 'MD',
    'master system': 'MS',
    'dreamcast': 'DC',
    'saturn': 'SAT',

    'pc': 'PC',
    'arcade': 'ARCADE',
    'atari 2600': 'ATARI2600',
    'xbox' : 'XBOX'
  };

  const key = input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, ' ');

  return map[key] || 'UNKNOWN';
}


fs.createReadStream("stock_legacy_full.csv")
  .pipe(csv({ separator: CSV_SEPARATOR }))
  .on("data", (row) => {
    let purchasePrice = convertPriceToEuro(row.prix_achat);
    let estimatedValue = convertPriceToEuro(row.valeur_estimee);

    if (estimatedValue === null) {
      estimatedValue = purchasePrice;
    }

    let state = row.etat;
    if (!VALID_STATES.includes(state)) {
      state = "Moyen";
    }

    if (!row.annee_sortie) {
      gamesMissingYear.push(row);
    }

    platformCorrected = cleanPlatform(row.plateforme);
    
    cleanedGames.push({
      ...row,
      prix_achat: purchasePrice,
      valeur_estimee: estimatedValue,
      etat: state,
      plateforme : platformCorrected
    });

  })
  .on("end", async () => {
    const cleanedWriter = createObjectCsvWriter({
      path: "stock_cleaned.csv",
      fieldDelimiter: ";",
      header: Object.keys(cleanedGames[0]).map(key => ({
        id: key,
        title: key
      }))
    });

    await cleanedWriter.writeRecords(cleanedGames);

    if (gamesMissingYear.length > 0) {
      const missingYearWriter = createObjectCsvWriter({
        path: "stock_missing_date.csv",
        fieldDelimiter: ";",
        header: Object.keys(gamesMissingYear[0]).map(key => ({
          id: key,
          title: key
        }))
      });

      await missingYearWriter.writeRecords(gamesMissingYear);
    }

    console.log("Finished cleaning CSV files");
  });
