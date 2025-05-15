import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/AuthProvider";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const UserMyBooking = () => {
  const { user } = useContext(AuthContext);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000 * 60); // Update current time every minute

    return () => clearInterval(interval);
  }, []);

  const { data: booking = [], refetch } = useQuery(
    ["booking", user?.email],
    async () => {
      const res = await fetch(
        `http://localhost:3000/api/v1/bookings/email/${user?.email}`,
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

  //   console.log(userBooking)
  const handleAutoDelete = (booking) => {
    const creationTime = new Date(booking.createdAt); // Assuming createdAt field exists in your booking data

    // Calculate the time difference in minutes
    const timeDifference = Math.floor(
      (currentTime - creationTime) / (1000 * 60)
    );

    if (timeDifference >= 60 && booking.price && booking.paid === false) {
      fetch(`http://localhost:3000/api/v1/bookings/${booking._id}`, {
        method: "DELETE",
      }).then();
    }
  };

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
        fetch(`http://localhost:3000/api/v1/bookings/${id}`, {
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
      <div className="overflow-x-auto lg:p-20">
        <div className="text-3xl font-bold text-center mb-10"> My Bookings</div>
        <table className="table bg-slate-950">
          {/* head */}
          <thead>
            <tr>
              <th className=" bg-slate-700 rounded-tl-xl py-4">
                <label>Booking</label>
              </th>
              <th className=" bg-slate-700 text-slate-300">Turf Name</th>
              <th className=" bg-slate-700 text-slate-300">
                Email & Booking Id
              </th>

              <th className=" bg-slate-700 text-slate-300">Date & Slots</th>

              <th className=" bg-slate-700 text-slate-300 ">Turf Details</th>
              <th className=" bg-slate-700 text-slate-300 ">Payment </th>
              <th className=" bg-slate-700 text-slate-300 rounded-tr-xl">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {booking.map((booked, index) => {
              handleAutoDelete(booked); // Check and auto-delete for each booking
              return (
                <tr key={booked._id}>
                  <th>
                    <label>
                      <p>{index + 1}</p>
                    </label>
                  </th>
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
                        <div className="font-bold">{booked.name}</div>
                        <div className="text-sm opacity-50">{booked.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {booked.email}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      id : {booked._id}
                    </span>
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
                      <button className="btn btn-circle bg-success text-white">
                        <box-icon name="check" color="white"></box-icon>
                      </button>
                    )}
                  </td>
                  <td>
                    <button onClick={() => handleDelete(booked._id)}>
                      <box-icon name="trash" color="gray"></box-icon>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserMyBooking;
