import 'babel-polyfill';
import puppeteer from 'puppeteer';
import fs from 'fs';

import { person } from '../components';
import { APPROVED_FILE, SCRAPED_FILE } from '../conf';

let browser = null;
let page = null;

/**
 * Check the relevance of scraping data
 */
async function userValidation() {
  browser = await puppeteer.launch();
  page = await browser.newPage();

  const dataList = [];
  const persons = JSON.parse(fs.readFileSync(SCRAPED_FILE, 'utf8'));

  for (const item of persons) {
    const data = await person.get(page, item.link);
    dataList.push({ ...data, ...item });
  }

  await person.close(browser);

  fs.writeFile(APPROVED_FILE, JSON.stringify(dataList), err => {
    if (err) return console.log(err);
    console.log(`Saved list of ${dataList.length} items`);
  });
}

userValidation();
