/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlayZone from "../Home/PlayZone";
import GoBooking from "./GoBooking";
import Heading from "../Home/Heading";


const TurfDetails = () => {
  const [turfDetails, setTurfDetails] = useState([]);
  const { id } = useParams();
  const { cover, logo, turf_name, address, about, rules } = turfDetails;

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/turf/${id}`, {
      headers: {
        authorization: `bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setTurfDetails(data.data));
  }, [id]);

  return (
    <>
      <section className="max-w-7xl mx-auto   text-gray-600 body-font relative bg-nearest-rgb-23-32-49">
        <div className="container px-5 py-24 mx-auto flex flex-col">
          <div className="lg:w- mx-auto">
            <div className="rounded-lg h-64 overflow-hidden">
              <img
                alt="content"
                className="object-cover object-center h-full w-full"
                src={cover}
              />
            </div>
            <div className="flex flex-col sm:flex-row mt-10">
              <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                  <img
                    src={logo}
                    alt=""
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-20 h-20 rounded-full"
                  />
                </div>
                <div className="flex flex-col items-center text-center justify-center">
                  <h2 className="font-medium title-font mt-4 text-white text-sm">
                    {turf_name}
                  </h2>
                  <div className="w-12 h-1 bg-cyan-500 rounded mt-2 mb-4"></div>
                  <p className="text-gray-400">
                    {address} <span>chittagong,Bangladesh</span>
                  </p>
                </div>
              </div>
              <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                <p className="leading-relaxed text-gray-400 text-xm mb-4 text-justify">
                  {about}
                </p>
              </div>
            </div>
            {}
            <blockquote className="mb-6 border-l-4 pl-4 italic  text-gray-500 sm:text-xm md:mb-8 md:pl-6 text-justify lg:mt-5">
              Rules : "{rules}"
            </blockquote>
          </div>
        </div>

        <div
          className="absolute inset-0 blur-[118px] max-w-lg h-[1400px] mx-auto sm:max-w-3xl sm:h-[400px]"
          style={{
            background:
              "linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)",
            zIndex: -4,
          }}
        ></div>
        <GoBooking></GoBooking>
        <Heading></Heading>
        <PlayZone></PlayZone>
      </section>
    </>
  );
};

export default TurfDetails;
