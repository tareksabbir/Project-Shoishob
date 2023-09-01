import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthProvider";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import coin from "../../../assets/icons/star (1).png";

const PayHistory = () => {
  const { user } = useContext(AuthContext);

  const { data: booking = [], refetch } = useQuery(
    ["booking", user?.email],
    async () => {
      const res = await fetch(
        `http://localhost:5000/api/v1/history/email/${user?.email}`,
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

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You Wanted Delete This Booking!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#5ac5a6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/api/v1/bookings/${id}`, {
          method: "DELETE",
        }).then(() => {
          Swal.fire("Done!!", "Booking Deleted Successfully ", "success");
          refetch();
        });
      }
    });
  };
  return (
    <>
      <>
        <div className="overflow-x-auto lg:p-20 ">
          <div className="text-3xl font-bold text-center mb-10">
            {" "}
            Payment History
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

                <th className=" bg-slate-700 text-slate-300 rounded-tr-xl ">
                  Delate
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
                        <div className="font-bold">{booked?.name}</div>
                        <div className="font-bold">{booked?.email}</div>
                        <div className="text-sm opacity-50">
                          {booked?.phone}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span>trx_id : {booked.transactionId}</span>
                  </td>

                  <td>
                    <div>
                      <div className="font-bold">{booked.date}</div>
                      <div className="text-sm opacity-50">{booked.slots}</div>
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
                    
                      <button>
                        <img src={coin} className="w-10"></img>
                      </button>
                 
                  </td>

                  <td>
                    <button onClick={() => handleDelete(booked._id)}>
                      <box-icon name="trash" color="gray"></box-icon>
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
    </>
  );
};

export default PayHistory;
