/**
 * Returns current date with month offset by month
 * @param {number} month - Number of months
 * @return {number} New date
 */
const getDate = (month = 0) => {
  const date = new Date();
  date.setMonth(date.getMonth() - month);
  return date;
};

export default getDate;
