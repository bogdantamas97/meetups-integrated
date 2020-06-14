import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addMonths, setHours, setMinutes } from "date-fns";

export const TopicDatePicker = (props) => {
  const { topicDate, handleChangeDate } = props;
  return (
    <DatePicker
      selected={topicDate}
      onChange={handleChangeDate}
      showTimeSelect
      minTime={setHours(setMinutes(new Date(), 0), 10)}
      maxTime={setHours(setMinutes(new Date(), 30), 20)}
      minDate={new Date()}
      maxDate={addMonths(new Date(), 6)}
      dateFormat="MMMM d, yyyy h:mm aa"
      format="MMMM d, yyyy h:mm aa"
    />
  );
};
