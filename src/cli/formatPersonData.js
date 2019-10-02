import 'babel-polyfill';
import fs from 'fs';

import { clearLine, getDate } from '../libs';
import { APPROVED_FILE, FILTERED_FILE } from '../conf';

/**
 * Format data
 */
function formatPersonData() {
  const personData = JSON.parse(fs.readFileSync(APPROVED_FILE, 'utf8'));
  const date = getDate(3);
  const filteredPersonData = personData.filter(item => item.date > date);
  const sortedPersonData = filteredPersonData.sort((a, b) => b.date - a.date);
  const mapedPersonData = sortedPersonData.map(item => {
    const updatedData = item;
    updatedData.tags = updatedData.tags.map(tag => clearLine(tag));
    return updatedData;
  });

  fs.writeFile(FILTERED_FILE, JSON.stringify(mapedPersonData), err => {
    if (err) return console.log(err);
    console.log(`Saved list of ${mapedPersonData.length} items`);
  });
}

formatPersonData();
