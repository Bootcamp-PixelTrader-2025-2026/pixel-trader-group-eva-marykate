const csv = require('csvtojson');
const fs = require('fs');

csv()
  .fromFile('stock_cleaned.csv')
  .then(jsonObj => {
    fs.writeFileSync('stock.json', JSON.stringify(jsonObj, null, 2));
    console.log('CSV converted to JSON successfully!');
  });
