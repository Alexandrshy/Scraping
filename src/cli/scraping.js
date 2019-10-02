import 'babel-polyfill';
import puppeteer from 'puppeteer';
import fs from 'fs';

import { list } from '../components';
import { SCRAPED_FILE } from '../conf';

let browser = null;
let page = null;

/**
 * Scraping data from a site
 */
async function scraping() {
  browser = await puppeteer.launch();
  page = await browser.newPage();

  await list.init(page);
  const links = await list.get(page);
  await list.close(browser);

  fs.writeFile(SCRAPED_FILE, JSON.stringify(links), err => {
    if (err) return console.error(err);
    console.log(`Saved list of ${links.length} items`);
  });
}

scraping();
