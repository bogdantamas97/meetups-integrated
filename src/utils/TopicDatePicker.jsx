import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, addMonths, setHours, setMinutes } from "date-fns";

export const TopicDatePicker = (props) => {
  const { topicDate, handleChangeDate } = props;
  return (
    <DatePicker
      selected={topicDate}
      onChange={handleChangeDate}
      showTimeSelect
      minTime={setHours(setMinutes(new Date(), 0), 10)}
      maxTime={setHours(setMinutes(new Date(), 30), 20)}
      minDate={addDays(new Date(), 1)}
      maxDate={addMonths(new Date(), 6)}
      dateFormat="MMMM d, yyyy hh:mm aa"
      format="MMMM d, yyyy hh:mm aa"
    />
  );
};
