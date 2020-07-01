const INVALID_DATE = 'Invalid Date';
const getDateFormat = (date) => {
  if (date.toString() === INVALID_DATE) {
    return new Error(INVALID_DATE);
  } else {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const hours = "0" + date.getHours();
    const minutes = "0" + date.getMinutes();
    const theDate = date.toLocaleDateString(undefined, options);
    const theTime = ` ${hours.substr(-2)}:${minutes.substr(-2)}`;

    return theDate + theTime;
  }
};
it("should return the correct date", () => {
  const date = new Date("2020-07-20T10:00:00.614Z");
  expect(getDateFormat(date)).toEqual("July 20, 2020 13:00");
});

it("should return an error if the date is invalid", () => {
  expect(getDateFormat(INVALID_DATE)).toEqual(new Error(INVALID_DATE));
});
