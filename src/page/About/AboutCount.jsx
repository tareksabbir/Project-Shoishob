export default function AboutCount() {
  return (
    <>
      <main className="relative bg-nearest-rgb-23-32-49">
        <section className="relative">
          <div className="bg-nearest-rgb-23-32-49 py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-lg px-4 md:px-8">
              <div className="mb-8 md:mb-12">
                <h2 className="mb-4 text-center text-2xl font-bold text-white md:mb-6 lg:text-3xl">
                  Our Team by the numbers
                </h2>

                <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
                  This is a section of some simple filler text, also known as
                  placeholder text. It shares some characteristics of a real
                  written text but is random or otherwise generated.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 rounded-lg bg-indigo-500 p-6 md:grid-cols-4 md:gap-8 md:p-8">
                <div className="flex flex-col items-center">
                  <div className="text-xl font-bold text-white sm:text-2xl md:text-3xl">
                    20
                  </div>
                  <div className="text-sm text-indigo-200 sm:text-base">
                    Sports Zone
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="text-xl font-bold text-white sm:text-2xl md:text-3xl">
                    50+
                  </div>
                  <div className="text-sm text-indigo-200 sm:text-base">
                    Stuffs
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="text-xl font-bold text-white sm:text-2xl md:text-3xl">
                    1500+
                  </div>
                  <div className="text-sm text-indigo-200 sm:text-base">
                    Customers
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="text-xl font-bold text-white sm:text-2xl md:text-3xl">
                    A couple
                  </div>
                  <div className="text-sm text-indigo-200 sm:text-base">
                    Coffee breaks
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div
          className="absolute inset-0 blur-[218px] max-w-lg h-[1400px] mx-auto sm:max-w-3xl sm:h-[400px]"
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
