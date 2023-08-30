import { format } from "date-fns";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const BookingModal = ({ booking, selectedDate, setBooking, refetch }) => {
  const { turf_name, address, slots, logo, price, ownerId } = booking;
  console.log(booking);
  const date = format(selectedDate, "PP");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleBooking = (event) => {
    event.preventDefault();
    const form = event.target;
    const turf = turf_name;
    const photo = logo;
    const name = form.name.value;
    const email = form.email.value;
    const slot = form.slot.value;
    const phone = form.phone.value;
    const address = form.address.value;
    const price = form.price.value;
    const paid = false;

    // const selectedDate = new Date(form.date.value);
    // const currentDate = new Date();

    // if (selectedDate < currentDate) {
    //     Swal.fire("Invalid Date", "Please select a date that is after the current date.", "error");
    //     return;
    // }

    const booking = {
      turf,
      name,
      email,
      slot,
      phone,
      address,
      price,
      photo,
      ownerId,
      paid,
      selectedDate: date,
    };

    fetch("http://localhost:5000/api/v1/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        const id = data.data._id;

        if (data.success) {
          setBooking(null);
          // Swal.fire(
          //   "Congratulations!!",
          //   "Your Booking Is fixed!",
          //   "success"
          // );

          Swal.fire({
            title: "Congratulations!!",
            text: "Your Booking Is fixed!",
            icon: "success",
            confirmButtonColor: "#5ac5a6",
            cancelButtonColor: "#d33",
            showCancelButton: true,
            confirmButtonText: "Pay Now",
            cancelButtonText: "Pay Letter!",
            reverseButtons: true,
          }).then((result) => {
            if (result.isConfirmed) {
              navigate(`/dashboard/payment/${id}`);
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              Swal.fire("Pay within 60 minutes!", "Otherwise Your booking will delete automatically", "warning");
            }
          });

          refetch();
        } else if (data.message) {
          Swal.fire("Sorry", `${data.message}`, "error");
        }
      });
  };

  return (
    <>
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <form
            onSubmit={handleBooking}
            method="dialog"
            className="grid grid-cols-1 gap-3 justify-items-center"
          >
            <img
              alt="team"
              className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mx-auto mb-2"
              src={logo}
            />
            <h3 className="font-bold text-3xl text-center mb-1 text-white">
              {turf_name}
            </h3>
            <p className="text-lg text-center mb-5">{address}</p>

            <input
              name="name"
              type="text"
              placeholder="Your Name"
              defaultValue={user?.displayName}
              disabled
              className="input input-bordered w-full max-w-xs"
            />
            <input
              name="email"
              placeholder="Your Email"
              type="email"
              defaultValue={user?.email}
              disabled
              className="input input-bordered w-full max-w-xs"
            />

            <input
              type="text"
              name="date"
              value={date}
              disabled
              className="input input-bordered w-full max-w-xs"
            />
            <input
              name="price"
              type="text"
              value={price}
              disabled
              className="input input-bordered w-full max-w-xs"
            />

            <select
              name="slot"
              className="select select-bordered w-full max-w-xs"
            >
              {slots.map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))}
            </select>

            <input
              name="phone"
              type="number"
              placeholder="Phone Number"
              className="input input-bordered w-full max-w-xs"
            />
            <input
              name="address"
              placeholder="Your Address"
              type="text"
              className="input input-bordered w-full max-w-xs"
            />

            <input
              type="submit"
              value="submit"
              className="btn btn-primary w-full max-w-xs text-white"
            />
          </form>
        </div>
        <div
          className="absolute inset-0 blur-[118px] max-w-lg h-[1400px] mx-auto sm:max-w-3xl sm:h-[400px]"
          style={{
            background:
              "linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)",
            zIndex: -1,
          }}
        ></div>
        <label className="modal-backdrop" htmlFor="my_modal_7">
          Close
        </label>
      </div>
    </>
  );
};

export default BookingModal;
