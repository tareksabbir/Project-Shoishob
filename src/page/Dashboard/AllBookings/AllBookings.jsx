import { useQuery } from "react-query";
import Swal from "sweetalert2";
import axios from "axios";

const AllBookings = () => {
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "https://shoihob-backend.vercel.app";

  const { data: booking = [], refetch } = useQuery(["booking"], async () => {
    const res = await axios.get(`${backendUrl}/api/v1/bookings`, {
      headers: {
        authorization: `bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return res.data.data;
  });

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
        axios.delete(`${backendUrl}/api/v1/bookings/${id}`).then(() => {
          Swal.fire("Done!!", "Booking Deleted Successfully ", "success");
          refetch();
        });
      }
    });
  };

  return (
    <>
      <div className="overflow-x-auto lg:p-20">
        <table className="table bg-slate-950">
          {/* head */}
          <thead>
            <tr>
              <th className=" bg-slate-700 rounded-tl-xl py-4">
                <label>User</label>
              </th>
              <th className=" bg-slate-700 text-slate-300">Name</th>
              <th className=" bg-slate-700 text-slate-300">
                Email & Booking Id
              </th>

              <th className=" bg-slate-700 text-slate-300">Date & Slots</th>

              <th className=" bg-slate-700 text-slate-300 ">Details</th>
              <th className=" bg-slate-700 text-slate-300 rounded-tr-xl">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {booking.map((book, index) => (
              <tr key={book._id}>
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
                          src={book?.photo}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{book.name}</div>
                      <div className="text-sm opacity-50">{book.phone}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {book.email}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    id : {book._id}
                  </span>
                </td>

                <td>
                  <div>
                    <div className="font-bold">{book.selectedDate}</div>
                    <div className="text-sm opacity-50">{book.slot}</div>
                  </div>
                </td>
                <th>
                  <div>
                    <div className="font-bold">{book.turf}</div>
                    <div className="text-sm opacity-50">{book.price} Taka</div>
                  </div>
                </th>
                <td>
                  <button onClick={() => handleDelete(book._id)}>
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

export default AllBookings;
