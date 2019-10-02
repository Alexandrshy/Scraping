import { BASE_URL } from '../conf';
import { CARDS_LINKS, CARDS_TAGS } from '../constants/selectors';

export const list = {
  /**
   * Init page
   */
  init: async page => {
    await page.goto(BASE_URL);
  },

  /**
   * Get data from the site
   */
  get: async page => {
    const url = await page.url();

    if (url !== BASE_URL) await page.goto(BASE_URL);

    const data = await page.evaluate(
      ({ link, tag }) => {
        return Array.from(document.querySelectorAll(link), item => ({
          link: item.getAttribute('href'),
          tags: item.querySelector(tag).innerText.split(', '),
        }));
      },
      { link: CARDS_LINKS, tag: CARDS_TAGS },
    );

    return data;
  },

  /**
   * Close browser
   */
  close: async browser => {
    await browser.close();
  },
};
