/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Featured() {
  const backendURL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

  const {
    data: tournament = [],
    isLoading,
    isError,
  } = useQuery(["tournament"], async () => {
    try {
      const res = await axios.get(`${backendURL}/api/v1/tournament-details`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("access_token")}`,
        },
      });
      return res.data.data || [];
    } catch (err) {
      console.error("Error fetching tournaments:", err);
      throw err;
    }
  });

  if (isLoading) {
    return (
      <div className="flex flex-wrap -m-3">
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="xl:w-1/4 md:w-1/2 sm:w-full p-4">
              <div className="bg-slate-900 p-6 rounded-lg animate-pulse">
                <div className="h-40 w-full bg-slate-700 rounded mb-6"></div>
                <div className="h-4 w-1/3 bg-slate-700 rounded mb-2"></div>
                <div className="h-5 w-2/3 bg-slate-700 rounded mb-4"></div>
              </div>
            </div>
          ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 py-20">
        Failed to load tournaments. Please try again later.
      </div>
    );
  }

  return (
    <main className="relative bg-nearest-rgb-23-32-49">
      <section className="text-gray-600 body-font bg-nearest-rgb-23-32-49">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
              <h1 className="sm:text-3xl text-2xl title-font mb-2 font-extrabold bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text">
                Upcoming{" "}
                <span className="text-white">Events and Tournaments</span>
              </h1>
              <div className="h-1 w-20 bg-indigo-500 rounded"></div>
            </div>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-400">
              Stay updated on our upcoming events and tournaments, where you can
              participate and showcase your skills. Join us for thrilling
              competitions, engaging activities, and memorable experiences.
              Don't miss out on the excitement and opportunities that await you
              at our upcoming events and tournaments.
            </p>
          </div>

          <div className="flex flex-wrap -m-3">
            {tournament.map((tur) => (
              <Link
                to={`/tournament-booking/${tur._id}`}
                key={tur._id}
                className="xl:w-1/4 md:w-1/2 sm:w-full p-4"
              >
                <div className="bg-slate-900 p-6 rounded-lg">
                  <img
                    className="h-40 rounded w-full object-cover object-center mb-6"
                    src={tur.cover}
                    alt={tur.tournament_name}
                  />
                  <p className="tracking-widest bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text text-xs font-medium title-font">
                    REGISTRATION
                  </p>
                  <h2 className="text-sm text-white font-medium title-font mb-4">
                    {tur.tournament_name}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div
        className="absolute inset-0 blur-[210px] max-w-lg h-[800px] mx-auto sm:max-w-3xl sm:h-[400px]"
        style={{
          background:
            "linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)",
          zIndex: -1,
        }}
      ></div>
    </main>
  );
}
