import { EVENT_TYPE, MAX_ATTENDANTS_ON_EVENT } from "./eventConstants";
import {
  EMAIL_REGEX,
  EMAIL_ALREADY_EXISTS,
  REGISTRATION_SUCCESSFULLY,
  REGISTRATION_FAILED,
  LOGIN_SUCCESFULLY,
  LOGIN_FAILED,
  IN_ONE_HOUR,
  CURRENT_USER_ID,
} from "./signingConstants";
import {
  TOPIC_TITLE_LIMIT,
  TOPIC_DESCRIPTION_LIMIT,
} from "./charLimitConstants";
import {
  DATA_BASE_URL,
  EVENTS_URL,
  ACHIEVEMENTS_URL,
  POINTS_RECEIVED_URL,
  PROPOSED_TOPICS_URL,
} from "./databaseConstants";

import {
  CONTENT_PLACEHOLDER,
  TOPIC_TYPES,
  DIFFICULTY_TYPES,
  PROGRAMMING_LANGUAGES,
  TOPIC_DURATIONS,
} from "./topicConstants";

export {
  EVENT_TYPE,
  CONTENT_PLACEHOLDER,
  TOPIC_TYPES,
  TOPIC_DURATIONS,
  DIFFICULTY_TYPES,
  PROGRAMMING_LANGUAGES,
  EMAIL_REGEX,
  EMAIL_ALREADY_EXISTS,
  REGISTRATION_SUCCESSFULLY,
  REGISTRATION_FAILED,
  LOGIN_SUCCESFULLY,
  LOGIN_FAILED,
  TOPIC_TITLE_LIMIT,
  CURRENT_USER_ID,
  IN_ONE_HOUR,
  TOPIC_DESCRIPTION_LIMIT,
  DATA_BASE_URL,
  EVENTS_URL,
  MAX_ATTENDANTS_ON_EVENT,
  ACHIEVEMENTS_URL,
  POINTS_RECEIVED_URL,
  PROPOSED_TOPICS_URL,
};
