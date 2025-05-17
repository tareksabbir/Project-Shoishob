import contact from "../../assets/images/hero5.png";
import ApplePlayStore from "../../Svg/ApplePlayStore";
import GooglePlay from "../../Svg/GooglePlay";

export default function EmailCollect() {
  return (
    <div className="relative ">
      <section className="max-w-7xl mx-auto px-5 py-20 flex flex-col-reverse md:flex-row items-center">
        {/* Text + Form */}
        <div className="md:w-1/2 flex flex-col md:items-start items-center text-center md:text-left mb-10 md:mb-0">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
            Learn more about us
          </h1>
          <p className="text-gray-400 mb-8 max-w-md">
            Your curiosity is important to us, and we’re here to provide you with the insights you seek.
          </p>

          {/* Email Form */}
          <form className="flex w-full max-w-md gap-3 flex-col sm:flex-row">
            <div className="flex-1">
              <label htmlFor="email" className="block text-sm text-gray-300 mb-1">
                Your Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:bg-white transition"
              />
            </div>
            <button
              type="submit"
              className="shrink-0 mt-2 sm:mt-6 sm:ml-2 py-2 px-6 text-white bg-indigo-600 hover:bg-indigo-700 rounded text-sm transition"
            >
              Submit
            </button>
          </form>
          <p className="text-sm text-gray-500 mt-2">Please provide your email here</p>

          {/* App Buttons */}
          <div className="flex flex-wrap gap-4 mt-8">
            <button className="bg-gray-100 hover:bg-gray-200 py-3 px-5 rounded-lg flex items-center focus:outline-none transition">
              <GooglePlay />
              <span className="ml-4 text-left">
                <span className="text-xs text-gray-600 block">GET IT ON</span>
                <span className="font-medium text-sm">Google Play</span>
              </span>
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 py-3 px-5 rounded-lg flex items-center focus:outline-none transition">
              <ApplePlayStore />
              <span className="ml-4 text-left">
                <span className="text-xs text-gray-600 block">Download on the</span>
                <span className="font-medium text-sm">App Store</span>
              </span>
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 w-full">
          <img
            src={contact}
            alt="Contact Illustration"
            className="w-full h-auto object-cover object-center rounded"
          />
        </div>
      </section>

      {/* Glowing Gradient Background Blur */}
      <div
        className="absolute inset-0 blur-[218px] max-w-lg h-[1000px] mx-auto sm:max-w-3xl sm:h-[400px] -z-10"
        style={{
          background:
            "linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)",
        }}
      />
    </div>
  );
}
