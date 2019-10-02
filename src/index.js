import 'babel-polyfill';
import puppeteer from 'puppeteer';
import fs from 'fs';

import { list, person } from './components';
import { clearLine, getDate } from './libs';
import { APPROVED_FILE, FILTERED_FILE, SCAPED_FILE } from './conf';

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

  fs.writeFile(SCAPED_FILE, JSON.stringify(links), err => {
    if (err) return console.log(err);
    console.log('The file was saved!');
  });
}

/**
 * Check the relevance of scraping data
 */
async function userValidation() {
  browser = await puppeteer.launch();
  page = await browser.newPage();

  const persons = JSON.parse(fs.readFileSync(SCAPED_FILE, 'utf8'));
  const dataList = persons.reduce(async (acc, item) => {
    const data = await person.get(page, item.link);
    acc.push({ ...data, ...item });
    return acc;
  }, []);

  await person.close(browser);

  fs.writeFile(APPROVED_FILE, JSON.stringify(dataList), err => {
    if (err) return console.log(err);
    console.log('The file was saved!');
  });
}

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
    console.log('The file was saved!');
  });
}

async function run() {
  await scraping();
  await userValidation();
  formatPersonData();
}

run();
