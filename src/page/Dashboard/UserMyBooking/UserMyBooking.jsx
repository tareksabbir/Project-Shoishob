import { useContext } from "react";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Context/AuthProvider";


const UserMyBooking = () => {
      const { user} = useContext(AuthContext);
      const { data: booking = [], refetch,} = useQuery(["booking",user?.email], async () => {
        const res = await fetch(`http://localhost:5000/api/v1/bookings/email/${user?.email}`, {
          headers: {
            authorization: `bearer ${localStorage.getItem("access_token")}`,
          },
        });
        const data = await res.json();
        return data.data;
      });

  //   console.log(userBooking)

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
            method: "DELETE"
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
        <table className="table bg-slate-900">
          {/* head */}
          <thead>
            <tr>
              <th className=" bg-slate-700 rounded-tl-xl py-4">
                <label>User</label>
              </th>
              <th className=" bg-slate-700 text-slate-300">Name</th>
              <th className=" bg-slate-700 text-slate-300">Email & User Id</th>

              <th className=" bg-slate-700 text-slate-300">Make Admin</th>

              <th className=" bg-slate-700 text-slate-300 ">Details</th>
              <th className=" bg-slate-700 text-slate-300 rounded-tr-xl">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {booking.map((booked, index) => (
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
                    <div className="text-sm opacity-50">{booked.price} Taka</div>
                  </div>
                </th>
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
    </>
  );
};

export default UserMyBooking;
