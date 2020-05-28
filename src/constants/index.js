import { eventType, MAX_ATTENDANTS_ON_EVENT } from "./eventConstants";
import {
  EMAIL_REGEX,
  EMAIL_ALREADY_EXISTS,
  REGISTRATION_SUCCESSFULLY,
  REGISTRATION_FAILED,
  LOGIN_SUCCESFULLY,
  LOGIN_FAILED,
} from "./sigingConstants";
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
  contentPlaceholder,
  topicTypes,
  difficultyTypes,
  programmingLanguages,
  topicDurations,
} from "./topicConstants";

export {
  eventType,
  contentPlaceholder,
  topicTypes,
  topicDurations,
  difficultyTypes,
  programmingLanguages,
  EMAIL_REGEX,
  EMAIL_ALREADY_EXISTS,
  REGISTRATION_SUCCESSFULLY,
  REGISTRATION_FAILED,
  LOGIN_SUCCESFULLY,
  LOGIN_FAILED,
  TOPIC_TITLE_LIMIT,
  TOPIC_DESCRIPTION_LIMIT,
  DATA_BASE_URL,
  EVENTS_URL,
  MAX_ATTENDANTS_ON_EVENT,
  ACHIEVEMENTS_URL,
  POINTS_RECEIVED_URL,
  PROPOSED_TOPICS_URL,
};
