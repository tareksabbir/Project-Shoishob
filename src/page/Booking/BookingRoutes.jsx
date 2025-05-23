import { useState } from "react";
import BookingAvailableSlots from "./BookingAvailableSlots";
import BookingBanner from "./BookingBanner";
import PlayZone from "../Home/PlayZone";
import { startOfDay } from "date-fns";

//import Practice from "./practice";

export default function BookingRoutes() {
  // Initialize with today's date using startOfDay to normalize
  const [selectedDate, setSelectedDate] = useState(startOfDay(new Date()));
  
  return (
    <div className="max-w-7xl mx-auto">
      <BookingBanner
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      ></BookingBanner>
      <BookingAvailableSlots
        selectedDate={selectedDate}
      ></BookingAvailableSlots>
      {/* <Practice></Practice> */}
      <PlayZone></PlayZone>
    </div>
  );
}