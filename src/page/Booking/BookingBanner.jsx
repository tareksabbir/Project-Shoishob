/* eslint-disable react/prop-types */
import booking from "../../assets/images/booking.png";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";

const BookingBanner = ({ selectedDate, setSelectedDate }) => {
  let footer = <p>Please pick a day.</p>;
  if (selectedDate) {
    footer = (
      <p className="mt-2 mb-5">You picked {format(selectedDate, "PP")}.</p>
    );
  }

  return (
    <section className="flex flex-col lg:flex-row justify-between gap-6 sm:gap-10 md:gap-16 px-10 lg:px-32 mb-10">
      <div className="xl:w-5/12 flex flex-col justify-center lg:items-start sm:text-center lg:text-left lg:py-10 xl:py-10">
        <h1 className="text-black-800 text-3xl sm:text-4xl md:text-4xl font-bold mb-4 md:mb-12 lg:mb-2  px-10 lg:px-0 lg:mt-14">
          Pick Your Date
        </h1>

        <div className="mx-auto">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
          />
        </div>
        {footer}
      </div>

      <div className="xl:w-6/12 h-full mx-auto">
        <img
          src={booking}
          loading="lazy"
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </div>
    </section>
  );
};

export default BookingBanner;
