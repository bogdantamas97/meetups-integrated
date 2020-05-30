export const getDateFormat = (date) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const theDate = date.toLocaleDateString(undefined, options);
  const theTime = ` ${date.getHours()}:${date.getMinutes()} `;

  return theDate + theTime;
};
