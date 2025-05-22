/* eslint-disable react/no-unescaped-entities */
import contact from "../../assets/images/hero5.png";
import ApplePlayStore from "../../Svg/ApplePlayStore";
import GooglePlay from "../../Svg/GooglePlay";

export default function EmailCollect() {
  return (
    <div className="relative ">
      <section className="relative max-w-screen-2xl mx-auto px-5 md:px-10 py-20 lg:py-32">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
          {/* Text + Form */}
          <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
                  Learn more
                </span>
                <br />
                <span className="text-white">about us</span>
              </h1>
              <p className="text-gray-300 text-lg max-w-lg leading-relaxed">
                Your curiosity is important to us, and we're here to provide you
                with the insights you seek. Join our community today.
              </p>
            </div>

            {/* Email Form */}
            <div className="w-full max-w-md space-y-4">
              <form className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 text-white bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 placeholder-gray-400"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-6 text-white font-medium bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900 shadow-lg hover:shadow-cyan-500/25"
                >
                  Get Started
                </button>
              </form>
              <p className="text-sm text-gray-400 text-center lg:text-left">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>

            {/* App Store Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <button className="flex-1 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 py-3 px-4 rounded-xl flex items-center justify-center gap-3 focus:outline-none transition-all duration-300 group">
                <GooglePlay />
                <div className="text-left">
                  <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                    GET IT ON
                  </div>
                  <div className="font-semibold text-sm text-white">
                    Google Play
                  </div>
                </div>
              </button>

              <button className="flex-1 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 py-3 px-4 rounded-xl flex items-center justify-center gap-3 focus:outline-none transition-all duration-300 group">
                <ApplePlayStore />
                <div className="text-left">
                  <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                    Download on the
                  </div>
                  <div className="font-semibold text-sm text-white">
                    App Store
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div className="lg:w-1/2 w-full">
            <img
              src={contact}
              alt="Contact Illustration"
              className="w-full h-auto object-cover rounded-xl "
            />
          </div>
        </div>
      </section>
    </div>
  );
}
