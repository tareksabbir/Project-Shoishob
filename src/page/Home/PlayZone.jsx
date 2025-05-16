/* eslint-disable react/no-unescaped-entities */

export default function PlayZone() {
  return (
    <>
      <main className="relative bg-nearest-rgb-23-32-49">
        <section className="relative">
          <section className="text-gray-600 body-font bg-nearest-rgb-23-32-49">
            <div className="container px-5 py-20 mx-auto flex flex-wrap">
              <div className="flex w-full mb-20 flex-wrap">
                <h1 className="sm:text-3xl text-2xl font-medium title-font lg:w-1/3 lg:mb-0 mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
                  Enlightening Moments In Our{" "}
                  <span className="text-white">Sport Zones</span>
                </h1>
                <p className="lg:pl-6 lg:w-2/3 mx-auto leading-relaxed text-gray-400 text-sm">
                  Experience enlightening moments in our sport zones, where
                  passion, skill, and camaraderie converge. From exhilarating
                  matches to awe-inspiring performances, our sport zones provide
                  a platform for unforgettable moments of triumph, teamwork, and
                  personal growth. Embrace the joy and fulfillment of sporting
                  excellence in our vibrant and dynamic environments.
                </p>
              </div>
              <div className="flex flex-wrap md:-m-1 -m-1">
                <div className="flex flex-wrap w-1/2">
                  <div className="md:p-2 p-1 w-1/2">
                    <img
                      alt="gallery"
                      className="w-full object-cover h-full object-center block"
                      src="https://images.unsplash.com/photo-1473075109809-7a17d327bdf6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fHR1cmZ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&h=300"
                    />
                  </div>
                  <div className="md:p-2 p-1 w-1/2">
                    <img
                      alt="gallery"
                      className="w-full object-cover h-full object-center block"
                      src="https://images.unsplash.com/photo-1540675493356-1524d37869bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHR1cmZ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=501&h=301"
                    />
                  </div>
                  <div className="md:p-2 p-1 w-full">
                    <img
                      alt="gallery"
                      className="w-full h-full object-cover object-center block"
                      src="https://images.unsplash.com/photo-1529900748604-07564a03e7a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=360"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap w-1/2">
                  <div className="md:p-2 p-1 w-full">
                    <img
                      alt="gallery"
                      className="w-full h-full object-cover object-center block"
                      src="https://images.unsplash.com/photo-1557101346-e04bc569f7d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=601&h=361"
                    />
                  </div>
                  <div className="md:p-2 p-1 w-1/2">
                    <img
                      alt="gallery"
                      className="w-full object-cover h-full object-center block"
                      src="https://images.unsplash.com/photo-1506079906501-adbb5907b720?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=502&q=302"
                    />
                  </div>
                  <div className="md:p-2 p-1 w-1/2">
                    <img
                      alt="gallery"
                      className="w-full object-cover h-full object-center block"
                      src="https://images.unsplash.com/photo-1513609698234-16d36e4b7a65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHR1cmZ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=503&h=303"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
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
