import {
  PAGE_CONTAINER,
  PERSON_NAME,
  PERSON_URL_TEXT,
  PERSON_IMG,
  TWEET_TIME,
  COUNTERS_TWEETS,
  COUNTERS_FOLLOWERS,
  DATA_COUNT,
  DATA_TIME,
} from '../constants/selectors';
import { BASE_URL } from '../conf';

export const person = {
  /**
   * Init page
   */
  init: async page => {
    await page.goto(BASE_URL);
  },

  /**
   * Get data from the site
   */
  get: async (page, URL) => {
    const url = await page.url();

    if (url !== URL) await page.goto(URL);

    const data = await page.evaluate(
      ({
        container,
        name,
        urlText,
        img,
        countTweets,
        countFollowers,
        time,
        dataCount,
        dataTime,
      }) => {
        const cont = document.querySelector(container);

        return {
          name: cont && cont.querySelector(name) ? cont.querySelector(name).innerText : '',
          urlText: cont && cont.querySelector(urlText) ? cont.querySelector(urlText).innerText : '',
          img: cont && cont.querySelector(img) ? cont.querySelector(img).src : '',
          countTweets:
            cont && cont.querySelector(countTweets)
              ? cont.querySelector(countTweets).getAttribute(dataCount)
              : '',
          countFollowers:
            cont && cont.querySelector(countFollowers)
              ? cont.querySelector(countFollowers).getAttribute(dataCount)
              : '',
          date:
            cont && cont.querySelectorAll(time) && cont.querySelectorAll(time)[1]
              ? cont.querySelectorAll(time)[1].getAttribute(dataTime)
              : '',
        };
      },
      {
        container: PAGE_CONTAINER,
        name: PERSON_NAME,
        urlText: PERSON_URL_TEXT,
        time: TWEET_TIME,
        img: PERSON_IMG,
        dataCount: DATA_COUNT,
        dataTime: DATA_TIME,
        countTweets: COUNTERS_TWEETS,
        countFollowers: COUNTERS_FOLLOWERS,
      },
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
