/* eslint-disable react/prop-types */

import { format } from "date-fns";
import { useState } from "react";
import BookingCard from "./BookingCard";
import BookingModal from "./BookingModal";
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";

export default function BookingAvailableSlots({ selectedDate }) {
  const [booking, setBooking] = useState(null);
  const date = format(selectedDate, "PP");

  const {
    data: turfs = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["turfs", date],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/api/v1/turf?date=${date}`);
      const data = await res.json();
      return data.data;
    },
  });

  if (isLoading) {
    <Loading></Loading>;
  }

  return (
    <>
      <main className="relative bg-nearest-rgb-23-32-49">
        <section className="relative">
          <section>
            <div className=" py-6 sm:py-8 lg:py-12 bg-nearest-rgb-23-32-49">
              <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                <p className="mb-2 text-center font-semibold text-white md:mb-3 lg:text-lg">
                  {format(selectedDate, "PP")}
                </p>

                <h2 className="mb-4 text-center text-2xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text lg:mt-6 md:mb-6 lg:text-3xl">
                  Available Zones In The City
                </h2>

                <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
                  ensuring that our services are accessible and tailored to your
                  specific location. Experience the convenience of our
                  wide-ranging coverage, making it easier for you to access our
                  facilities and services within your zone.
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
                refetch={refetch}
              ></BookingModal>
            )}
          </section>
        </section>
        <div
          className="absolute inset-0 blur-[218px] max-w-lg h-[1000px] mx-auto sm:max-w-3xl sm:h-[400px]"
          style={{
            background:
              "linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)",
            zIndex: -1,
          }}
        ></div>
      </main>
    </>
  );
}
