/* eslint-disable react/prop-types */
import booking from "../../assets/images/hero7.png";
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
    <>
      <main className="relative bg-nearest-rgb-23-32-49">
        <section className="relative">
          <section className="flex flex-col lg:flex-row justify-between gap-6 sm:gap-10 md:gap-16 px-10 lg:px-32 mb-10 ">
            <div className="xl:w-5/12 flex flex-col justify-center lg:items-start sm:text-center lg:text-left lg:py-10 xl:py-10">
              <h1 className="font-extrabold bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text lg:mt-16text-3xl sm:text-4xl md:text-4xl mb-4 md:mb-12 lg:mb-2  px-10 lg:px-0 lg:mt-14">
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

            <div className="xl:w-7/12 h-full mx-auto">
              <img
                src={booking}
                loading="lazy"
                alt=""
                className="w-full h-full object-cover object-center"
              />
            </div>
          </section>
        </section>
        <div
          className="absolute inset-0 blur-[118px] max-w-lg h-[1400px] mx-auto sm:max-w-3xl sm:h-[400px]"
          style={{
            background:
              "linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)",
            zIndex: -1,
          }}
        ></div>
      </main>
    </>
  );
};

export default BookingBanner;
