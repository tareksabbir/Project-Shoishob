import { useQuery } from "react-query";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

import print from "../../../assets/icons/icons8-print-48.png";
import coin from "../../../assets/icons/star (1).png";
import Loading from "../../Loading/Loading";

const TournamentPayment = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const transactionId = query.get("transactionId");

  const { data: booking = [], isLoading } = useQuery(
    ["booking", transactionId],
    async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/tournamentRegistration/payment/details/${transactionId}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      return res.data.data;
    }
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="overflow-x-auto lg:p-20 lg:py-40">
        <table className="table bg-slate-950">
          {/* head */}
          <thead>
            <tr>
              <th className=" bg-slate-700 text-slate-300 rounded-tl-xl py-4">
                Turf Name
              </th>
              <th className=" bg-slate-700 text-slate-300">Transaction Id</th>

              <th className=" bg-slate-700 text-slate-300">Date & Slots</th>

              <th className=" bg-slate-700 text-slate-300 ">Turf Details</th>
              <th className=" bg-slate-700 text-slate-300 ">Payment </th>
              <th className=" bg-slate-700 text-slate-300 rounded-tr-xl">
                Invoice
              </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {booking.map((booked) => (
              <tr key={booked._id}>
                <td>
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-bold">{booked?.team_name}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span>trx_id : {booked.transactionId}</span>
                </td>

                <td>
                  <div>
                    <div className="font-bold">{booked?.email}</div>
                  </div>
                </td>
                <th>
                  <div>
                    <div className="text-sm opacity-50">
                      {booked.price} Taka
                    </div>
                  </div>
                </th>
                <td>
                  {booked.price && !booked?.paid ? (
                    <Link to={`/dashboard/payment/${booked._id}`}>
                      <button className="btn btn-circle bg-red-700 text-white">
                        <box-icon name="credit-card" color="white"></box-icon>
                      </button>
                    </Link>
                  ) : (
                    <button>
                      <img src={coin} className="w-10"></img>
                    </button>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-circle bg-cyan-700 text-white"
                    onClick={() => window.print()}
                  >
                    <img src={print} alt="" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TournamentPayment;
