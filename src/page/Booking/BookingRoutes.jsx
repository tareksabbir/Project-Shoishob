import { useState } from "react";
import BookingAvailableSlots from "./BookingAvailableSlots";
import BookingBanner from "./BookingBanner";
//import Practice from "./practice";

export default function BookingRoutes() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <>
      <BookingBanner
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      ></BookingBanner>
      <BookingAvailableSlots
        selectedDate={selectedDate}
      ></BookingAvailableSlots>
      {/* <Practice></Practice> */}
    </>
  );
}
