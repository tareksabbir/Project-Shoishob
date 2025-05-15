/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import TurfCard from "./TurfCard";

export default function Turf() {
  const [turfs, setTurfs] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/api/v1/turf/details")
      .then((res) => res.json())
      .then((data) => setTurfs(data.data));
  }, []);
  return (
    <>
      <main className="relative bg-nearest-rgb-23-32-49">
        <section className="relative">
          <section className="text-gray-600 body-font bg-nearest-rgb-23-32-49">
            <div className="container px-5 py-24 mx-auto">
              <div className="flex flex-wrap -m-3 ">
                {turfs.toReversed().map((turf) => (
                  <TurfCard key={turf._id} turf={turf}></TurfCard>
                ))}
              </div>
            </div>
          </section>
        </section>

        <div
          className="absolute inset-0 blur-[318px] max-w-lg h-[800px] mx-auto sm:max-w-3xl sm:h-[400px]"
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
