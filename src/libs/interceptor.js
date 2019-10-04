import fs from 'fs';

export const requestInterceptor = ({ blackList }) => e => {
  if (blackList.find(item => item.test(e.url))) {
    e.abort();
  } else {
    e.continue();
  }
};
