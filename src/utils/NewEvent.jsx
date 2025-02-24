const NewEvent = (props) => {
  const event = {};
  const {
    topicTitle,
    topicType,
    topicDate,
    programmingLanguage,
    topicDuration,
    difficultyType,
    timestamp,
    userId,
    isUserPresenter,
  } = props;

  event.name = topicTitle;
  event.type = topicType;
  event.date = topicDate;
  event.lang = programmingLanguage;
  event.duration = topicDuration;
  event.difficulty = difficultyType;
  event.timestamp = timestamp;
  event.attendanceIds = [];
  event.waitingListIds = [];
  event.feedback = [];

  if (isUserPresenter) event.userId = userId;

  return event;
};

export default NewEvent;
