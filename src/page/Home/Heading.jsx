/* eslint-disable react/no-unescaped-entities */

export default function Heading() {
  return (
    <>
      <main className="relative bg-nearest-rgb-23-32-49">
        <section className="relative">
          <section className="text-gray-600 body-font bg-nearest-rgb-23-32-49">
            <div className="container px-5 py-24 mx-auto">
              <div className="flex flex-col text-center w-full mb-20">
                <h2 className="text-sm text-white tracking-widest font-medium title-font mb-1">
                  WHY WE ARE THE BEST
                </h2>
                <h1 className="sm:text-3xl lg:text-4xl text-3xl font-bold title-font mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
                  Your health is of great importance to us
                </h1>
                <p className="lg:w-2/3 mx-auto leading-relaxed text-gray-400 text-sm">
                  At our core, your well-being holds utmost significance. We
                  prioritize and deeply care about your health, ensuring every
                  effort is made to safeguard and enhance it. With unwavering
                  dedication, we strive to provide comprehensive support and
                  resources, empowering you to lead a vibrant and fulfilling
                  life.
                </p>
              </div>
              <div className="flex flex-wrap">
                <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
                  <h2 className="text-sm sm:text-xl text-white font-medium title-font mb-2">
                    Leader Board
                  </h2>
                  <p className="leading-relaxed text-gray-400 mb-4">
                    Our leader board facility allows you to track and compare
                    your progress with others, fostering a spirit of healthy
                    competition and motivation.
                  </p>
                  <a className="text-blue-500 inline-flex items-center">
                    Learn More
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
                <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
                  <h2 className="text-sm sm:text-xl text-white font-medium title-font mb-2">
                    Doctor Facilitie
                  </h2>
                  <p className="leading-relaxed text-gray-400 mb-4">
                    We offer top-notch doctor facilities to meet your healthcare
                    needs, ensuring personalized and reliable medical care.
                  </p>
                  <a className="text-indigo-500 inline-flex items-center">
                    Learn More
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>

                <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
                  <h2 className="text-sm sm:text-xl text-white font-medium title-font mb-2">
                    Zone Availability
                  </h2>
                  <p className="leading-relaxed text-gray-400 mb-4">
                    We provide zone availability, ensuring that our services are
                    accessible and tailored to your specific location.
                  </p>
                  <a className="text-indigo-500 inline-flex items-center">
                    Learn More
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
                <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
                  <h2 className="text-sm sm:text-xl text-white font-medium title-font mb-2">
                    Easy Payment
                  </h2>
                  <p className="leading-relaxed text-gray-400 mb-4">
                    Enjoy the convenience of seamless and user-friendly payment
                    options, making your experience with us even more enjoyable.
                  </p>
                  <a className="text-blue-500 inline-flex items-center">
                    Learn More
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </section>
        <div
          className="absolute inset-0 blur-[280px] max-w-lg h-[1200px] mx-auto sm:max-w-3xl sm:h-[400px]"
          style={{
            background:
              "linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)",
            zIndex: -1,
          }}
        ></div>
      </main>
    </>
  );
}
