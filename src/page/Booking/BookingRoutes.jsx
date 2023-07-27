import { useState } from "react";
import BookingAvailableSlots from "./BookingAvailableSlots";
import BookingBanner from "./BookingBanner";
import PlayZone from "../Home/PlayZone";

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
      <PlayZone></PlayZone>

    </>
  );
}
