const AREA_REGEX = /(^|[+|-]{1})((?<hours>)[0-9]{2})/;
const INVALID_TIMESTAMP = 'Invalid Timestamp'

const checkAndGetHours = (hours) => {
  if (hours > 24) return hours - 24;
  if (hours < 0) return hours + 24;
  return hours;
};

const getTimeFromStamp = (timeStamp) => {
  const date = new Date(timeStamp * 1000);
  if(date.toString() === 'Invalid Date'){
      return new Error(INVALID_TIMESTAMP);
  }
  const regexDateMatch = date.toString().match(AREA_REGEX);
  const sign = regexDateMatch[1];
  const gmt = parseInt(regexDateMatch[2]);
  const currentHours =
    sign === "+" ? date.getHours() - gmt : date.getHours() + gmt;
  const hours = "0" + checkAndGetHours(currentHours);

  const minutes = "0" + date.getMinutes();
  return `${hours.substr(-2)}:${minutes.substr(-2)}`;
};

it("should return the correct date from timestamp", () => {
  const timestamp_1 = 1591288200;
  const timestamp_2 = 1596123000;
  const timestamp_3 = 1595014200;
  expect(getTimeFromStamp(timestamp_1)).toEqual("16:30");
  expect(getTimeFromStamp(timestamp_2)).toEqual("15:30");
  expect(getTimeFromStamp(timestamp_3)).toEqual("19:30");
});

it("should return an error if the date is invalid", () => {
    const timestamp_error = 1414634759012000000;
  expect(getTimeFromStamp(timestamp_error)).toEqual(new Error(INVALID_TIMESTAMP));
});
