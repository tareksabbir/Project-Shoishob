// Turf.jsx
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import TurfCard from "./TurfCard";
import TurfCardSkeleton from "../Skeletons/TurfCardSkeleton";

const Turf = () => {
  const [turfs, setTurfs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [hoveredCard, setHoveredCard] = useState(null);
  useEffect(() => {
    const fetchTurfs = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${backendURL}/api/v1/turf/details`);
        setTurfs(res.data.data);
        setError(null);
      } catch (error) {
        console.error("Failed to fetch turf details:", error);
        setError("Failed to load turf data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTurfs();
  }, [backendURL]);

  const reversedTurfs = useMemo(() => [...turfs].reverse(), [turfs]);

  const backgroundGradient = {
    background:
      "linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)",
  };

  return (
    <main className="relative bg-nearest-rgb-23-32-49 max-w-screen-2xl mx-auto">
      <section className="text-gray-600 body-font">
        <div className=" py-24 mx-auto">
          {isLoading ? (
            <TurfCardSkeleton />
          ) : error ? (
            <div className="text-center text-red-400">{error}</div>
          ) : turfs.length === 0 ? (
            <div className="text-center text-white">No turf records found</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 px-5 md:px-0">
              {reversedTurfs.map((turf, index) => (
                <TurfCard
                  key={turf._id}
                  turf={turf}
                  index={index}
                  hoveredCard={hoveredCard}
                  setHoveredCard={setHoveredCard}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Background gradient */}
      <div
        className="absolute inset-0 blur-[318px] max-w-lg h-[800px] mx-auto sm:max-w-3xl sm:h-[400px] -z-10"
        style={backgroundGradient}
      />
    </main>
  );
};

export default Turf;
