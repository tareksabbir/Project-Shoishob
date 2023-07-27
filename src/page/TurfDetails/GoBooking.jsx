import { Link } from "react-router-dom";

const GoBooking = () => {
  return (
    <>
      <section className="text-gray-600 body-font py-12">
        <div className="container px-5  mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-4xl text-3xl text-white font-medium title-font mb-2 text-">
              Pricing
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-gray-400">
              Banh mi cornhole echo park skateboard authentic crucifix neutra
              tilde lyft biodiesel artisan direct trade mumblecore 3 wolf moon
              twee
            </p>
          </div>
          <div className="lg:w-3/4 w-full mx-auto overflow-auto">
            <table className="table-auto w-full text-center">
              <thead>
                <tr>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                    Plan
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Person
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-800 text-sm bg-gray-100">
                    Time
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody className="mx-auto">
                <tr>
                  <td className="px-4 py-3 text-gray-400">Start</td>
                  <td className="px-4 py-3 text-gray-400">10</td>
                  <td className="px-4 py-3 text-gray-400">60 min</td>
                  <td className="px-4 py-3 text-lg text-gray-400">3000</td>
                </tr>
                <tr>
                  <td className="border-t-2 border-gray-600 px-4 py-3 text-gray-400">
                    Pro
                  </td>
                  <td className="border-t-2 border-gray-600 px-4 py-3 text-gray-400">
                    12
                  </td>
                  <td className="border-t-2 border-gray-600 px-4 py-3 text-gray-400">
                    60 min
                  </td>
                  <td className="border-t-2 border-gray-600 px-4 py-3 text-lg text-gray-400">
                    3400
                  </td>
                </tr>
                <tr>
                  <td className="border-t-2 border-gray-600 px-4 py-3 text-gray-400">
                    Business
                  </td>
                  <td className="border-t-2 border-gray-600 px-4 py-3 text-gray-400">
                    14
                  </td>
                  <td className="border-t-2 border-gray-600 px-4 py-3 text-gray-400">
                    60min
                  </td>
                  <td className="border-t-2 border-gray-600 px-4 py-3 text-lg text-gray-400">
                    3800
                  </td>
                </tr>
                <tr>
                  <td className="border-t-2 border-b-2 border-gray-600 px-4 py-3 text-gray-400">
                    Exclusive
                  </td>
                  <td className="border-t-2 border-b-2 border-gray-600 px-4 py-3 text-gray-400">
                    16
                  </td>
                  <td className="border-t-2 border-b-2 border-gray-600 px-4 py-3 text-gray-400">
                    60 min
                  </td>
                  <td className="border-t-2 border-b-2 border-gray-600 px-4 py-3 text-lg text-gray-400">
                    4000
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex pl-4 mt-4 lg:w-3/4 w-full mx-auto">
            <a className="text-blue-500 inline-flex items-center md:mb-2 lg:mb-0">
              Learn More
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </a>
            <Link
              to="/booking"
              className="flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
            >
              Book Now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default GoBooking;
