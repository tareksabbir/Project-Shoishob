/* eslint-disable react/no-unescaped-entities */
import f1 from "../../assets/featured/f-1.jpeg";
import f2 from "../../assets/featured/f-3.jpeg";
import f3 from "../../assets/featured/f-4.jpeg";
import f4 from "../../assets/featured/f-5.jpeg";

export default function Featured() {
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                Upcoming Events and Tournaments
              </h1>
              <div className="h-1 w-20 bg-indigo-500 rounded"></div>
            </div>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
              Stay updated on our upcoming events and tournaments, where you can
              participate and showcase your skills. Join us for thrilling
              competitions, engaging activities, and memorable experiences.
              Don't miss out on the excitement and opportunities that await you
              at our upcoming events and tournaments.
            </p>
          </div>
          <div className="flex flex-wrap -m-3">
            <div className="xl:w-1/4 md:w-1/2 sm:w-full p-4">
              <div className="bg-gray-100 p-6 rounded-lg">
                <img
                  className="h-40 rounded w-full object-cover object-center mb-6"
                  src={f1}
                  alt="content"
                />
                <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                  REGISTRATION
                </h3>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                  Sicho Arena Tournament
                </h2>
              </div>
            </div>
            <div className="xl:w-1/4 md:w-1/2 p-4">
              <div className="bg-gray-100 p-6 rounded-lg">
                <img
                  className="h-40 rounded w-full object-cover object-center mb-6"
                  src={f2}
                  alt="content"
                />
                <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                  REGISTRATION
                </h3>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                  Chatto Turf Tournament
                </h2>
              </div>
            </div>
            <div className="xl:w-1/4 md:w-1/2 p-4">
              <div className="bg-gray-100 p-6 rounded-lg">
                <img
                  className="h-40 rounded w-full object-cover object-center mb-6"
                  src={f3}
                  alt="content"
                />
                <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                  REGISTRATION
                </h3>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                  AKC Play Tournament
                </h2>
              </div>
            </div>
            <div className="xl:w-1/4 md:w-1/2 p-4">
              <div className="bg-gray-100 p-6 rounded-lg">
                <img
                  className="h-40 rounded w-full object-cover object-center mb-6"
                  src={f4}
                  alt="content"
                />
                <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                  REGISTRATION
                </h3>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                  ACM Turf Tournament
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
