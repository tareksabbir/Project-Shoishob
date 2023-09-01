import { useQuery } from "react-query";
import { Link, useLocation } from "react-router-dom";

import print from "../../../assets/icons/icons8-print-48.png";
import coin from "../../../assets/icons/star (1).png";
import Loading from "../../Loading/Loading";
import Swal from "sweetalert2";

const PaymentSuccess = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const transactionId = query.get("transactionId");

  const { data: booking = [], isLoading } = useQuery(
    ["booking", transactionId],
    async () => {
      const res = await fetch(
        `http://localhost:5000/api/v1/bookings/payment/details/${transactionId}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      const data = await res.json();
      return data.data;
    }
  );

  if (isLoading) {
    return <Loading></Loading>;
  }

  const handlePayHistory = (pay) => {
    const payHistory = {
      name: pay.name,
      email: pay.email,
      phone: pay.phone,
      transactionId: pay.transactionId,
      slots: pay.slot,
      date: pay.selectedDate,
      turf: pay.turf,
      price: pay.price,
    };
 console.log(payHistory)
    fetch("http://localhost:5000/api/v1/history/post-pay-data", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payHistory),
    })
      .then((res) => res.json())
      .then((data) => {
        if(data){
          Swal.fire("Done!", "Your Invoice Is Saved", "success");
        }
       
      })
  };

  return (
    <>
      <div className="overflow-x-auto lg:p-20 lg:py-40">
        <div className="text-3xl font-bold text-center mb-10">
          {" "}
          Please print your Invoice first
        </div>
        <table className="table bg-slate-950 ">
          {/* head */}
          <thead>
            <tr>
              <th className=" bg-slate-700 text-slate-300 rounded-tl-xl py-4">
                Turf Name
              </th>
              <th className=" bg-slate-700 text-slate-300">Transaction Id</th>

              <th className=" bg-slate-700 text-slate-300">Date & Slots</th>

              <th className=" bg-slate-700 text-slate-300 ">Turf Details</th>
              <th className=" bg-slate-700 text-slate-300 ">Paid </th>
              <th className=" bg-slate-700 text-slate-300 ">Print it</th>
              <th className=" bg-slate-700 text-slate-300 rounded-tr-xl ">
                Pay History
              </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {booking.map((booked) => (
              <tr key={booked._id}>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={booked?.photo}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{booked?.name}</div>
                      <div className="font-bold">{booked?.email}</div>
                      <div className="text-sm opacity-50">{booked?.phone}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span>trx_id : {booked.transactionId}</span>
                </td>

                <td>
                  <div>
                    <div className="font-bold">{booked.selectedDate}</div>
                    <div className="text-sm opacity-50">{booked.slot}</div>
                  </div>
                </td>
                <th>
                  <div>
                    <div className="font-bold">{booked.turf}</div>
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
                    className="btn btn-circle  text-white"
                    onClick={() => window.print()}
                  >
                    <img src={print} alt="" />
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-rounded bg-cyan-700 text-white"
                    onClick={() => handlePayHistory(booked)}
                  >
                    save
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        className="absolute inset-0 blur-[118px] max-w-lg h-[1400px] mx-auto sm:max-w-3xl sm:h-[400px]"
        style={{
          background:
            "linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)",
          zIndex: -4,
        }}
      ></div>
    </>
  );
};

export default PaymentSuccess;
