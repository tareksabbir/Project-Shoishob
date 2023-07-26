/* eslint-disable react/prop-types */

const BookingCard = ({ turf, setBooking }) => {
  console.log(turf);
  const { logo, turf_name, slots, price } = turf;
  return (
    <>
      <div className="p-2 lg:w-1/5 md:w-1/3 w-1/2">
        <div className="h-full items-center border-gray-200 border p-6 rounded-lg">
          <img
            alt="team"
            className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mx-auto mb-2"
            src={logo}
          />
          <div className="flex-grow text-center">
            <h2 className="text-white title-font font-medium text-lg">
              {turf_name}
            </h2>

            <p className="text-gray-400 text-xs p-1">
              {" "}
              Available {slots.length} slots
            </p>

            <p className="text-gray-400 text-sm font-bold ">
              {slots.length > 0 ? slots[0] : "Fully Booked"}
            </p>
            <p className="text-white text-sm p-1 font-bold">{price}</p>

            <button
              className="text-white bg-primary px-3 py-1 text-xs rounded-md"
              onClick={() => {
                setBooking(turf);
                window.my_modal_3.showModal();
              }}
            >
              Book Now
            </button>
            
          </div>
        </div>
        
      </div>
    </>
  );
};

export default BookingCard;
