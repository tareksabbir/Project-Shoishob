import { format } from "date-fns";

/* eslint-disable react/prop-types */
const BookingModal = ({ booking, selectedDate, setBooking }) => {
  const { turf_name, address, slots } = booking;
  const date = format(selectedDate, "PP");
  const handleBooking = (event) => {
    event.preventDefault();
    const form = event.target;
    const turf = form.turf.value;
    const name = form.name.value;
    const email = form.email.value;
    const slot = form.slot.value;
    const phone = form.phone.value;
    const address = form.address.value;
    const booking = {
      turf,
      name,
      email,
      slot,
      phone,
      address,
      selectedDate: date,
    };

    console.log(booking);
    setBooking(null);
  };
  return (
    <>
      <dialog id="my_modal_3" className="modal">
        <form
          onSubmit={handleBooking}
          method="dialog"
          className="modal-box grid grid-cols-1 gap-3 justify-items-center"
        >
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
          <h3 className="font-bold text-3xl text-center mb-1">{turf_name}</h3>
          <p className="text-lg text-center mb-5">{address}</p>

          <input
            name="turf"
            type="text"
            value={turf_name}
            disabled
            className="input input-bordered w-full max-w-xs"
          />
          <input
            name="name"
            type="text"
            placeholder="Your Name"
            className="input input-bordered w-full max-w-xs"
          />
          <input
            name="email"
            placeholder="Your Email"
            type="email"
            className="input input-bordered w-full max-w-xs"
          />

          <input
            type="text"
            name="date"
            value={date}
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
            className="btn btn-primary w-full max-w-xs mb-5"
          />
        </form>
      </dialog>
    </>
  );
};

export default BookingModal;
