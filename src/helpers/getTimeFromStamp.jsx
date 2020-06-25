const AREA_REGEX = /(^|[+|-]{1})((?<hours>)[0-9]{2})/;

const checkAndGetHours = (hours) => {
  if (hours > 24) return hours - 24;
  if (hours < 0) return hours + 24;
  return hours;
};

export const getTimeFromStamp = (timeStamp) => {
  const date = new Date(timeStamp * 1000);
  const regexDateMatch = date.toString().match(AREA_REGEX);
  const sign = regexDateMatch[1];
  const gmt = parseInt(regexDateMatch[2]);
  const currentHours =
    sign === "+" ? date.getHours() - gmt : date.getHours() + gmt;
  const hours = "0" + checkAndGetHours(currentHours);

  const minutes = "0" + date.getMinutes();
  return `${hours.substr(-2)}:${minutes.substr(-2)}`;
};
