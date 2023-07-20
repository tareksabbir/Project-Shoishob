/* eslint-disable react/prop-types */
import acm from "../../assets/turf/acm.jpg";
import sicho from "../../assets/turf/sico.jpeg";
import ctgt from "../../assets/turf/ctgt.jpg";
import akc from "../../assets/turf/akc.jpg";
import ctgg from "../../assets/turf/ctgg.jpg";
import fortune from "../../assets/turf/fortune.jpg";
import GR from "../../assets/turf/GR Sports.jpg";
import khulshi from "../../assets/turf/khulshi.jpg";
import six from "../../assets/turf/Chawk Bazar.jpg";
import Choudhury from "../../assets/turf/Choudhury .jpg";
import { format } from "date-fns";

export default function BookingAvailableSlots({ selectedDate }) {
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
            <div className="p-2 lg:w-1/5 md:w-1/3 w-1/2">
              <div className="h-full items-center border-gray-200 border p-6 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mx-auto mb-2"
                  src={sicho}
                />
                <div className="flex-grow text-center">
                  <h2 className="text-gray-900 title-font font-medium">
                    Sicho Arena
                  </h2>
                  <p className="text-gray-500 ">Shangkar Bazar</p>
                  <a className="text-indigo-500 " href="" src="">
                    See more
                  </a>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/5 md:w-1/2 w-1/2">
              <div className="h-full items-center border-gray-200 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mx-auto mb-2"
                  src={ctgt}
                />
                <div className="flex-grow text-center">
                  <h2 className="text-gray-900 title-font font-medium">
                    ChattoTurf
                  </h2>
                  <p className="text-gray-500">2 no. Gate Moar</p>
                  <a className="text-indigo-500 " href="" src="">
                    See more
                  </a>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/5 md:w-1/2 w-1/2">
              <div className="h-full items-center border-gray-200 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mx-auto mb-2"
                  src={akc}
                />
                <div className="flex-grow text-center">
                  <h2 className="text-gray-900 title-font font-medium">
                    AKC PLAY
                  </h2>
                  <p className="text-gray-500">Chandra Nagar</p>
                  <a className="text-indigo-500 " href="" src="">
                    See more
                  </a>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/5 md:w-1/2 w-1/2">
              <div className="h-full items-center border-gray-200 border p-4 rounded-lg ">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mx-auto mb-2"
                  src={acm}
                />
                <div className="flex-grow text-center">
                  <h2 className="text-gray-900 title-font font-medium">
                    ACM Turf
                  </h2>
                  <p className="text-gray-500">Road No: 4, Katalganj</p>
                  <a className="text-indigo-500" href="" src="">
                    See more
                  </a>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/5 md:w-1/2 w-1/2">
              <div className="h-full items-center border-gray-200 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mx-auto mb-2"
                  src={ctgg}
                />
                <div className="flex-grow text-center">
                  <h2 className="text-gray-900 title-font font-medium">
                    Chattoground
                  </h2>
                  <p className="text-gray-500">Bayjid Bostami</p>
                  <a className="text-indigo-500" href="" src="">
                    See more
                  </a>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/5 md:w-1/2 w-1/2">
              <div className="h-full  items-center border-gray-200 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mx-auto mb-2"
                  src={fortune}
                />
                <div className="flex-grow text-center">
                  <h2 className="text-gray-900 title-font font-medium">
                    Fortune Arena
                  </h2>
                  <p className="text-gray-500">Chandgaon R/A 4212 </p>
                  <a className="text-indigo-500 " href="" src="">
                    See more
                  </a>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/5 md:w-1/2 w-1/2">
              <div className="h-full items-center border-gray-200 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mx-auto mb-2"
                  src={GR}
                />
                <div className="flex-grow text-center">
                  <h2 className="text-gray-900 title-font font-medium">
                    GR Sports
                  </h2>
                  <p className="text-gray-500">Kalamiya Bazar</p>
                  <a className="text-indigo-500 " href="" src="">
                    See more
                  </a>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/5 md:w-1/2 w-1/2">
              <div className="h-full  items-center border-gray-200 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mx-auto mb-2"
                  src={khulshi}
                />
                <div className="flex-grow text-center">
                  <h2 className="text-gray-900 title-font font-medium">
                    Khulshi Arena
                  </h2>
                  <p className="text-gray-500">465, Habib Lane</p>
                  <a className="text-indigo-500" href="" src="">
                    See more
                  </a>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/5 md:w-1/2 w-1/2">
              <div className="h-full items-center border-gray-200 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mx-auto mb-2"
                  src={six}
                />
                <div className="flex-grow text-center">
                  <h2 className="text-gray-900 title-font font-medium">
                    6ix CT
                  </h2>
                  <p className="text-gray-500">Chawk Bazar</p>
                  <a className="text-indigo-500" href="" src="">
                    See more
                  </a>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/5 md:w-1/2 w-1/2">
              <div className="h-full items-center border-gray-200 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mx-auto mb-2"
                  src={Choudhury}
                />
                <div className="flex-grow text-center">
                  <h2 className="text-gray-900 title-font font-medium">
                    Sports Club ctg
                  </h2>
                  <p className="text-gray-500">Choudhury Para </p>
                  <a className="text-indigo-500" href="" src="">
                    See more
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
