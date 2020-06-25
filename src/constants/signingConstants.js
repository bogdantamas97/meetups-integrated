
// eslint-disable-next-line
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const EMAIL_ALREADY_EXISTS = "Email is already registered";
const REGISTRATION_SUCCESSFULLY = "Your registration ended succesfully";
const REGISTRATION_FAILED = "Your registration failed";
const LOGIN_SUCCESFULLY = "You're now logged in";
const LOGIN_FAILED = "Wrong username and password";

const IN_ONE_HOUR = 1 / 24;

export {
  EMAIL_REGEX,
  EMAIL_ALREADY_EXISTS,
  REGISTRATION_SUCCESSFULLY,
  REGISTRATION_FAILED,
  LOGIN_SUCCESFULLY,
  LOGIN_FAILED,
  IN_ONE_HOUR,
};
