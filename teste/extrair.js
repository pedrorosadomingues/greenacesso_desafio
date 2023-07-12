const fs = require('fs');
const csv = require('csv-parser');

const results = [];

fs.createReadStream('teste/teste.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log(JSON.stringify(results[0]).slice(39, -1).split(';'));
      });
