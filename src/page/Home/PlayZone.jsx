import { useState, useEffect } from "react";

export default function PlayZone() {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Images with optimized loading attributes
  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1473075109809-7a17d327bdf6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80",
      alt: "Sports field aerial view",
      size: "half",
    },
    {
      src: "https://images.unsplash.com/photo-1540675493356-1524d37869bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80",
      alt: "Green sports turf closeup",
      size: "half",
    },
    {
      src: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=360&q=80",
      alt: "Sports stadium panorama",
      size: "full",
    },
    {
      src: "https://images.unsplash.com/photo-1557101346-e04bc569f7d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=360&q=80",
      alt: "Players on field",
      size: "full",
    },
    {
      src: "https://images.unsplash.com/photo-1506079906501-adbb5907b720?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80",
      alt: "Sports equipment on field",
      size: "half",
    },
    {
      src: "https://images.unsplash.com/photo-1513609698234-16d36e4b7a65?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80",
      alt: "Stadium lights at dusk",
      size: "half",
    },
  ];

  // Track when all images are loaded
  useEffect(() => {
    let loadedCount = 0;
    const imageElements = document.querySelectorAll(".gallery-image");

    if (imageElements.length === 0) {
      setImagesLoaded(true);
      return;
    }

    const imageLoadHandler = () => {
      loadedCount++;
      if (loadedCount === imageElements.length) {
        setImagesLoaded(true);
      }
    };

    imageElements.forEach((img) => {
      if (img.complete) {
        imageLoadHandler();
      } else {
        img.addEventListener("load", imageLoadHandler);
      }
    });

    return () => {
      imageElements.forEach((img) => {
        img.removeEventListener("load", imageLoadHandler);
      });
    };
  }, []);

  return (
    <main className="relative bg-nearest-rgb-23-32-49 ">
      <section className="relative">
        <section className="text-gray-600 body-font bg-nearest-rgb-23-32-49">
          <div className="container px-4 sm:px-6 py-12 sm:py-16 lg:py-20 mx-auto">
            {/* Heading and description section */}
            <div className="flex flex-col lg:flex-row w-full mb-8 lg:mb-12">
              <h1 className="text-2xl sm:text-3xl font-medium title-font lg:w-1/3 lg:mb-0 mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
                Enlightening Moments In Our{" "}
                <span className="text-white">Sport Zones</span>
              </h1>
              <p className="lg:pl-6 lg:w-2/3 mx-auto leading-relaxed text-gray-400 text-sm sm:text-base">
                Experience enlightening moments in our sport zones, where
                passion, skill, and camaraderie converge. From exhilarating
                matches to awe-inspiring performances, our sport zones provide a
                platform for unforgettable moments of triumph, teamwork, and
                personal growth. Embrace the joy and fulfillment of sporting
                excellence in our vibrant and dynamic environments.
              </p>
            </div>

            {/* Gallery section with loading state */}
            <div
              className={`transition-opacity duration-500 ${
                imagesLoaded ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="flex flex-col md:flex-row flex-wrap">
                {/* First column - stacks vertically on mobile, becomes left column on desktop */}
                <div className="w-full md:w-1/2 flex flex-wrap">
                  <div className="w-1/2 p-1 md:p-2 aspect-square sm:aspect-auto">
                    <img
                      alt={galleryImages[0].alt}
                      className="gallery-image w-full h-full object-cover rounded-lg shadow-lg transform transition-transform hover:scale-105"
                      src={galleryImages[0].src}
                      loading="lazy"
                    />
                  </div>
                  <div className="w-1/2 p-1 md:p-2 aspect-square sm:aspect-auto">
                    <img
                      alt={galleryImages[1].alt}
                      className="gallery-image w-full h-full object-cover rounded-lg shadow-lg transform transition-transform hover:scale-105"
                      src={galleryImages[1].src}
                      loading="lazy"
                    />
                  </div>
                  <div className="w-full p-1 md:p-2">
                    <img
                      alt={galleryImages[2].alt}
                      className="gallery-image w-full h-64 md:h-72 object-cover rounded-lg shadow-lg transform transition-transform hover:scale-105"
                      src={galleryImages[2].src}
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Second column - stacks vertically on mobile, becomes right column on desktop */}
                <div className="w-full md:w-1/2 flex flex-wrap">
                  <div className="w-full p-1 md:p-2">
                    <img
                      alt={galleryImages[3].alt}
                      className="gallery-image w-full h-64 md:h-72 object-cover rounded-lg shadow-lg transform transition-transform hover:scale-105"
                      src={galleryImages[3].src}
                      loading="lazy"
                    />
                  </div>
                  <div className="w-1/2 p-1 md:p-2 aspect-square sm:aspect-auto">
                    <img
                      alt={galleryImages[4].alt}
                      className="gallery-image w-full h-full object-cover rounded-lg shadow-lg transform transition-transform hover:scale-105"
                      src={galleryImages[4].src}
                      loading="lazy"
                    />
                  </div>
                  <div className="w-1/2 p-1 md:p-2 aspect-square sm:aspect-auto">
                    <img
                      alt={galleryImages[5].alt}
                      className="gallery-image w-full h-full object-cover rounded-lg shadow-lg transform transition-transform hover:scale-105"
                      src={galleryImages[5].src}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Loading state placeholder */}
            {!imagesLoaded && (
              <div className="flex flex-col md:flex-row flex-wrap animate-pulse">
                <div className="w-full md:w-1/2 flex flex-wrap">
                  <div className="w-1/2 p-1 md:p-2 h-40">
                    <div className="bg-slate-700 w-full h-full rounded-lg"></div>
                  </div>
                  <div className="w-1/2 p-1 md:p-2 h-40">
                    <div className="bg-slate-700 w-full h-full rounded-lg"></div>
                  </div>
                  <div className="w-full p-1 md:p-2 h-64">
                    <div className="bg-slate-700 w-full h-full rounded-lg"></div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 flex flex-wrap">
                  <div className="w-full p-1 md:p-2 h-64">
                    <div className="bg-slate-700 w-full h-full rounded-lg"></div>
                  </div>
                  <div className="w-1/2 p-1 md:p-2 h-40">
                    <div className="bg-slate-700 w-full h-full rounded-lg"></div>
                  </div>
                  <div className="w-1/2 p-1 md:p-2 h-40">
                    <div className="bg-slate-700 w-full h-full rounded-lg"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </section>

      {/* Background gradient effect */}
      <div
        className="absolute inset-0 blur-[180px] max-w-lg h-[800px] mx-auto sm:max-w-3xl sm:h-[400px]"
        style={{
          background:
            "linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)",
          zIndex: -1,
        }}
      ></div>
    </main>
  );
}
