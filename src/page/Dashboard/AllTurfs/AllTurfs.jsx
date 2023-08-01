import { useQuery } from "react-query";
import { Link } from "react-router-dom";

const AllTurfs = () => {
  const { data: turfs = [] } = useQuery(["booking"], async () => {
    const res = await fetch("http://localhost:5000/api/v1/turf/details", {
      headers: {
        authorization: `bearer ${localStorage.getItem("access_token")}`,
      },
    });
    const data = await res.json();
    return data.data;
  });

  return (
    <>
      <section className="text-gray-600 body-font bg-nearest-rgb-23-32-49">
        <div className="container px-5 py-20 mx-auto">
          <div className="flex flex-wrap -m-3 ">
            {turfs.map((turf) => (
              <div key={turf._id} className="p-1 lg:w-1/5 md:w-1/3 w-1/2 ">
                <div className="h-full bg-slate-900 items-center border-spacing-2  p-6 rounded-lg ">
                  <img
                    alt="team"
                    className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mx-auto mb-2"
                    src={turf.logo}
                  />
                  <div className="flex-grow text-center">
                    <h2 className="text-white mt-3 ">{turf.turf_name}</h2>
                    <p className="text-gray-400 text-sm p-1">{turf.address}</p>
                    <Link
                      to={`/turf/${turf._id}`}
                      className="bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text px-3 py-1 text-xs "
                    >
                      Update Info
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AllTurfs;
