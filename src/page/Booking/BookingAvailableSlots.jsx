/* eslint-disable react/prop-types */

import { format } from "date-fns";
import { useEffect, useState } from "react";
import BookingCard from "./BookingCard";
import BookingModal from "./BookingModal";

export default function BookingAvailableSlots({ selectedDate }) {
  const [turfs, setTurfs] = useState([]);
  const [booking, setBooking] = useState(null);
  const date = format(selectedDate, 'PP')

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/turf?date=${date}`)
      .then((res) => res.json())
      .then((data) => setTurfs(data.data));
  }, [date]);
  return (
    <>
      <section>
        <div className="bg-white py-6 sm:py-8 lg:py-12">
          <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
            <p className="mb-2 text-center font-semibold text-indigo-500 md:mb-3 lg:text-lg">
              {format(selectedDate, "PP")}
            </p>

            <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
              Available Zones In The City
            </h2>

            <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
              ensuring that our services are accessible and tailored to your
              specific location. Experience the convenience of our wide-ranging
              coverage, making it easier for you to access our facilities and
              services within your zone.
            </p>
          </div>
        </div>
      </section>

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-3">
            {turfs.map((turf) => (
              <BookingCard
                key={turf._id}
                turf={turf}
                setBooking={setBooking}
              ></BookingCard>
            ))}
          </div>
        </div>
        {booking && (
          <BookingModal
            booking={booking}
            selectedDate={selectedDate}
            setBooking={setBooking}
          ></BookingModal>
        )}
      </section>
    </>
  );
}
