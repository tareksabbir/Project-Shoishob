/* eslint-disable no-useless-escape */
/* eslint-disable react/no-unescaped-entities */
import Foodpanda from "../../assets/sponsor/Foodpanda-Logo.wine.png";
import Shohoj from "../../assets/sponsor/Sohoz_limited_logo.svg.png";
import Daraz from "../../assets/sponsor/daraz-logo.png";
import Nagad from "../../assets/sponsor/Nagad-Logo.wine.png";
import Nescafe from "../../assets/sponsor/nescafe-logo-1.png";
import CocaCola from "../../assets/sponsor/Coca-Cola_logo.svg.png";

// Mock sponsor data with placeholder images
const sponsors = [
  { id: 1, name: "Foodpanda", logo: Foodpanda, tier: "platinum" },
  { id: 2, name: "Shohoj", logo: Shohoj, tier: "gold" },
  { id: 3, name: "Daraz", logo: Daraz, tier: "gold" },
  {
    id: 4,
    name: "Coca Cola",
    logo: CocaCola,
    tier: "silver",
  },
  {
    id: 5,
    name: "Nagad",
    logo: Nagad,
    tier: "silver",
  },
  {
    id: 6,
    name: "Nescafe",
    logo: Nescafe,
    tier: "bronze",
  },
];

const TournamentSponsors = () => {
  const getTierColor = (tier) => {
    switch (tier) {
      case "platinum":
        return "from-purple-400 via-pink-400 to-purple-600";
      case "gold":
        return "from-yellow-400 via-orange-400 to-yellow-600";
      case "silver":
        return "from-gray-300 via-gray-400 to-gray-500";
      case "bronze":
        return "from-orange-400 via-amber-500 to-orange-600";
      default:
        return "from-blue-400 to-purple-600";
    }
  };

  const getTierGlow = (tier) => {
    switch (tier) {
      case "platinum":
        return "group-hover:shadow-purple-500/50";
      case "gold":
        return "group-hover:shadow-yellow-500/50";
      case "silver":
        return "group-hover:shadow-gray-400/50";
      case "bronze":
        return "group-hover:shadow-orange-500/50";
      default:
        return "group-hover:shadow-blue-500/50";
    }
  };

  return (
    <div className="bg-slate-900 py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-pink-500/10 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        {/* Header Section */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-full px-4 py-2 mb-6">
            <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full animate-pulse"></div>
            <span className="text-slate-300 text-sm font-medium">
              Proudly Supported By
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-transparent bg-clip-text leading-tight">
            Our Tournament Sponsors
          </h2>

          <p className="max-w-2xl mx-auto text-lg text-slate-300 leading-relaxed">
            We're grateful for the incredible support from our amazing partners
            who make this tournament possible. Together, we're creating
            unforgettable gaming experiences.
          </p>
        </div>

        {/* Sponsors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {sponsors.map((sponsor, index) => (
            <div
              key={sponsor.id}
              className="group relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className={`absolute -top-3 left-4 z-20 px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getTierColor(
                  sponsor.tier
                )} shadow-lg`}
              >
                {sponsor.tier.charAt(0).toUpperCase() + sponsor.tier.slice(1)}
              </div>

              <div
                className={`relative bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 h-32 sm:h-40 lg:h-44 flex items-center justify-center transition-all duration-500 group-hover:scale-105 group-hover:bg-slate-800/70 hover:shadow-2xl ${getTierGlow(
                  sponsor.tier
                )} overflow-hidden`}
              >
                <div
                  className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r ${getTierColor(
                    sponsor.tier
                  )} p-[1px]`}
                >
                  <div className="w-full h-full bg-slate-800/90 rounded-2xl"></div>
                </div>

                <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                  <div className="absolute top-4 right-4 w-16 h-16 border border-white/10 rounded-full"></div>
                  <div className="absolute bottom-4 left-4 w-8 h-8 border border-white/5 rounded-full"></div>
                </div>

                <div className="relative z-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="w-32 h-16 sm:w-36 sm:h-16 lg:w-40 lg:h-20 object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-500"
                  />
                </div>

                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"></div>
              </div>

              <div className="absolute -z-10 inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-2 right-2 w-1 h-1 bg-white/30 rounded-full animate-ping"></div>
                <div
                  className="absolute bottom-2 left-2 w-1 h-1 bg-white/20 rounded-full animate-ping"
                  style={{ animationDelay: "0.5s" }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 lg:mt-20">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 sm:p-8">
            <div className="text-left">
              <h3 className="text-xl font-semibold text-white mb-2">
                Interested in Sponsoring?
              </h3>
              <p className="text-slate-300 text-sm">
                Join our amazing partners and support the gaming community
              </p>
            </div>
            <button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 whitespace-nowrap">
              Become a Sponsor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentSponsors;
