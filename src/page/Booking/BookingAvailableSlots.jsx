/* eslint-disable react/prop-types */

import { format } from "date-fns";
import { useEffect, useState } from "react";

export default function BookingAvailableSlots({ selectedDate }) {
  const [turfs, setTurfs] = useState([]);

  useEffect(() => {
    fetch("service.json")
      .then((res) => res.json())
      .then((data) => setTurfs(data));
  });
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
              <div key={turf._id} className="p-2 lg:w-1/5 md:w-1/3 w-1/2">
                <div className="h-full items-center border-gray-200 border p-6 rounded-lg">
                  <img
                    alt="team"
                    className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mx-auto mb-2"
                    src={turf.logo}
                  />
                  <div className="flex-grow text-center">
                    <h2 className="text-gray-900 title-font font-medium text-lg">
                      {turf.turf_name}
                    </h2>
                    <p className="text-gray-500 text-xs p-1">{turf.address}</p>
                    <p className="text-gray-500 text-xs p-1">
                      {" "}
                      Available {turf.slots.length} slots
                    </p>

                    <p className="text-gray-800 text-sm font-bold ">
                      {turf.slots.length > 0 ? turf.slots[0] : "Fully Booked"}
                    </p>
                    <p className="text-gray-800 text-sm p-1 font-bold">
                      {turf.price}
                    </p>
                    <a
                      className="text-white bg-indigo-500 px-3 py-1 text-xs rounded-md"
                      href=""
                      src=""
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
