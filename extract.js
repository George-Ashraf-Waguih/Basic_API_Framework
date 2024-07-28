const unzipper = require('unzipper');
const fs = require('fs');
const path = require('path');

const zipPath = path.join(__dirname, 'Thetestdata_ZIP_5KB.zip');
const extractTo = path.join(__dirname, 'Thetestdata_ZIP_5KB');

fs.createReadStream(zipPath)
  .pipe(unzipper.Extract({ path: extractTo }))
  .on('close', () => {
    console.log('Extraction complete');
  });
