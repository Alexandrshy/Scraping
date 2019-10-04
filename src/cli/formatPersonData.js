import 'babel-polyfill';

import fs from 'fs';

import { clearLine, getDate } from '../libs';
import { options } from '../constants/option';

/**
 * Format data
 */
function formatPersonData() {
  const personData = JSON.parse(fs.readFileSync(options.files.approved, 'utf8'));
  const date = getDate(3);
  const filteredPersonData = personData.filter(item => item.date > date);
  const sortedPersonData = filteredPersonData.sort((a, b) => b.countFollowers - a.countFollowers);
  const mapedPersonData = sortedPersonData.map(item => {
    const updatedData = item;
    updatedData.tags = updatedData.tags.map(tag => clearLine(tag));
    return {
      person: {
        name: item.name,
        img: item.img,
      },
      twitter: {
        link: item.link,
        tags: item.tags,
        urlText: item.urlText,
        countTweets: item.countTweets,
        countFollowers: item.countFollowers,
        date: item.date,
      },
    };
  });

  fs.writeFile(options.files.filtered, JSON.stringify(mapedPersonData), err => {
    if (err) return console.log(err);
    console.log(`Saved list of ${mapedPersonData.length} items`);
  });
}

formatPersonData();
