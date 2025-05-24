/* eslint-disable no-unused-vars */

import { useState } from "react";
import Arrow from "../../Svg/Arrow";
import { Link } from "react-router-dom";
import Featured from "./Featured";

const features = [
  {
    title: "Leader Board",
    description:
      "Our leader board facility allows you to track and compare your progress with others, fostering a spirit of healthy competition and motivation.",
    color: "text-blue-400",
    bgColor: "from-blue-500/20 to-cyan-500/20",
    icon: "🏆",
    borderColor: "border-blue-500/30",
  },
  {
    title: "Doctor Facility",
    description:
      "We offer top-notch doctor facilities to meet your healthcare needs, ensuring personalized and reliable medical care.",
    color: "text-emerald-400",
    bgColor: "from-emerald-500/20 to-teal-500/20",
    icon: "👨‍⚕️",
    borderColor: "border-emerald-500/30",
  },
  {
    title: "Zone Availability",
    description:
      "We provide zone availability, ensuring that our services are accessible and tailored to your specific location.",
    color: "text-purple-400",
    bgColor: "from-purple-500/20 to-pink-500/20",
    icon: "📍",
    borderColor: "border-purple-500/30",
  },
  {
    title: "Easy Payment",
    description:
      "Enjoy the convenience of seamless and user-friendly payment options, making your experience with us even more enjoyable.",
    color: "text-orange-400",
    bgColor: "from-orange-500/20 to-yellow-500/20",
    icon: "💳",
    borderColor: "border-orange-500/30",
  },
];

const Heading = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <main className="relative   overflow-hidden max-w-screen-2xl mx-auto">
      <section className="relative z-10 text-gray-600 body-font max-w-screen-2xl mx-auto ">
        <div className=" px-5 py-24 mx-auto">
          {/* Enhanced Header */}
          <div className="flex flex-col text-center w-full mb-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4">
              <span className="text-2xl">✨</span>
            </div>
            <h2 className="text-sm text-blue-400 tracking-widest font-semibold title-font mb-2 uppercase">
              Why We Are The Best
            </h2>
            
                <h1 className="text-5xl sm:text-6xl lg:text-5xl font-black text-white mb-12 leading-tight mt-8 ">
                  Your health is of great
                  <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 text-transparent bg-clip-text ">
                    importance to us
                  </span>
                </h1>

            <p className="lg:w-2/3 mx-auto leading-relaxed text-gray-300 text-normal font-light">
              At our core, your well-being holds utmost significance. We
              prioritize and deeply care about your health, ensuring every
              effort is made to safeguard and enhance it. With unwavering
              dedication, we strive to provide comprehensive support and
              resources, empowering you to lead a vibrant and fulfilling life.
            </p>
          </div>

          {/* Enhanced Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative p-8 rounded-2xl bg-gradient-to-br ${
                  feature.bgColor
                } backdrop-blur-sm border ${
                  feature.borderColor
                } hover:border-opacity-60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-${
                  feature.color.split("-")[1]
                }-500/25 cursor-pointer`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Glow Effect */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.bgColor} opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-xl`}
                ></div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">{feature.icon}</span>
                  </div>

                  {/* Title */}
                  <h3
                    className={`text-xl font-bold text-white mb-4 group-hover:${feature.color} transition-colors duration-300`}
                  >
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="leading-relaxed text-gray-300 mb-6 text-sm">
                    {feature.description}
                  </p>

                  {/* Learn More Link */}
                  <div
                    className={`${feature.color} inline-flex items-center font-semibold group-hover:translate-x-2 transition-transform duration-300`}
                  >
                    <span>Learn More</span>
                    <div className="ml-2 group-hover:ml-3 transition-all duration-300">
                      <Arrow />
                    </div>
                  </div>
                </div>

                {/* Hover Indicator */}
                <div
                  className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${feature.bgColor.replace(
                    "/20",
                    ""
                  )} rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                ></div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <Link to={"/booking"}>
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                Get Started Today
              </button>
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Heading;
