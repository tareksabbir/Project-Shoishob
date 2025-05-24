/* eslint-disable react/prop-types */

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { isBefore, isToday, startOfDay } from "date-fns";

const BookingBanner = ({ selectedDate, setSelectedDate }) => {
  const today = startOfDay(new Date());

  const isDisabled = (date) => {
    return isBefore(startOfDay(date), today) && !isToday(date);
  };

  const handleDateSelect = (date) => {
    if (date && date instanceof Date && !isNaN(date)) {
      setSelectedDate(date);
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <DayPicker
        mode="single"
        disabled={isDisabled}
        selected={selectedDate}
        onSelect={handleDateSelect}
        className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl max-w-screen-lg p-10"
      />
    </div>
  );
};

export default BookingBanner;
