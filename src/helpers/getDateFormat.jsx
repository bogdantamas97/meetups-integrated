import { INVALID_DATE } from '../constants'
export const getDateFormat = (date) => {
  if (date.toString() === INVALID_DATE) {
    throw new Error(INVALID_DATE);
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
