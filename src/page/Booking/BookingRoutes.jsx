import { useState } from "react";
import BookingAvailableSlots from "./BookingAvailableSlots";
import BookingBanner from "./BookingBanner";

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
    </>
  );
}
