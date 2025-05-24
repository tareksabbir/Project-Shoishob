import { useQuery } from "react-query";
import axios from "axios";
import {
  Trophy,
  Medal,
  Award,
  TrendingUp,
  TrendingDown,
  Minus,
  ArrowDown,
  MapPin,
  Play,
  Users,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

const LeaderBoard = () => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const { data: users = [] } = useQuery(["users"], async () => {
    const res = await axios.get(`${backendURL}/api/v1/user`, {
      headers: {
        authorization: `bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return res.data.data;
  });

  const sortedUsers = users.slice().sort((a, b) => b.point - a.point);

  const getBadgeIcon = (position) => {
    if (position === 0) return <Trophy className="w-6 h-6 text-yellow-400" />;
    if (position === 1) return <Medal className="w-6 h-6 text-gray-300" />;
    if (position === 2) return <Award className="w-6 h-6 text-amber-600" />;
    if (position < 5) return <Award className="w-6 h-6 text-purple-400" />;
    return <Award className="w-6 h-6 text-gray-500" />;
  };

  const getRankStyle = (position) => {
    if (position === 0)
      return "bg-gradient-to-r from-yellow-900/20 to-yellow-800/20 border-l-4 border-yellow-400";
    if (position === 1)
      return "bg-gradient-to-r from-gray-900/20 to-gray-800/20 border-l-4 border-gray-300";
    if (position === 2)
      return "bg-gradient-to-r from-amber-900/20 to-amber-800/20 border-l-4 border-amber-600";
    if (position < 5)
      return "bg-gradient-to-r from-purple-900/20 to-purple-800/20 border-l-4 border-purple-400";
    return "bg-slate-800/50 border-l-4 border-transparent";
  };

  const getImprovementIcon = (improvement) => {
    if (improvement > 0)
      return <TrendingUp className="w-4 h-4 text-green-400" />;
    if (improvement < 0)
      return <TrendingDown className="w-4 h-4 text-red-400" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  const getImprovementColor = (improvement) => {
    if (improvement > 0) return "text-green-400";
    if (improvement < 0) return "text-red-400";
    return "text-gray-400";
  };

  return (
    <div className="min-h-screen  p-4">
      <div className="max-w-screen-2xl mx-auto  px-5 md:px-10">
        <div className="fixed top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>

        <div className="fixed z-10 max-w-screen-xl mx-auto px-4 md:px-8"></div>

        <div className="relative py-24 flex items-center justify-center">
          <div className="relative max-w-8xl mx-auto px-8 py-20 text-center">
            {/* Badge */}
            <div className="mb-12 animate-fade-in">
              <span className="inline-flex items-center px-8 py-4  rounded-full border border-blue-500/50 text-blue-300 font-medium text-xs md:text-xl backdrop-blur-sm">
                <Sparkles className="w-5 h-5 mr-3 animate-spin-slow" />
                Please Login to see the Leaderboard
                <Sparkles className="w-5 h-5 ml-3 animate-spin-slow" />
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black text-white mb-12 leading-tight ">
              The Leaders of
              <span className="block bg-gradient-to-r from-pink-500  to-purple-400 text-transparent bg-clip-text animate-pulse">
                Shoishob
              </span>
            </h1>

            <div className="w-24 h-1 bg-gradient-to-r from-blue-300 to-purple-400 mx-auto rounded-full mb-12" />

            {/* Subtitle */}
            <div className="max-w-6xl mx-auto mb-16 animate-fade-in-up delay-300">
              <p className="text-2xl lg:text-3xl xl:text-3xl text-slate-200 leading-relaxed font-light mb-16">
                The Shoishob Sports Leaderboard honors those who not only play
                to win, but reconnect to relive .
                <span className="text-white  font-bold">
                  {" "}
                  These are the champions keeping childhood alive—on the field,
                  in the heart, and across time.{" "}
                </span>
                Because true friendship never leaves the game.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-lg text-slate-400">
                <span className="flex items-center px-4 py-2 bg-slate-800/50 rounded-full border border-slate-700/50">
                  <Users className="w-4 h-4 mr-2" /> 5,00+ Active Kids
                </span>
                <span className="flex items-center px-4 py-2 bg-slate-800/50 rounded-full border border-slate-700/50">
                  <MapPin className="w-4 h-4 mr-2" /> 10+ Locations
                </span>
                <span className="flex items-center px-4 py-2 bg-slate-800/50 rounded-full border border-slate-700/50">
                  <Trophy className="w-4 h-4 mr-2" /> 10+ Sports
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in-up delay-500">
              <Link
                to={"/booking"}
                className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-12 py-6 rounded-2xl font-bold text-xl transition-all transform hover:scale-105 hover:-translate-y-1 shadow-2xl hover:shadow-blue-500/30 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-center justify-center">
                  <Play className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                  Start Your Journey
                </div>
              </Link>
              <button className="group bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600 hover:border-blue-500/50 px-12 py-6 rounded-2xl font-bold text-xl transition-all backdrop-blur-sm hover:shadow-xl hover:shadow-blue-500/10">
                <div className="flex items-center justify-center">
                  <MapPin className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                  Explore Zones
                </div>
              </button>
            </div>

            {/* Scroll Indicator */}
            <div className="animate-bounce">
              <ArrowDown className="w-8 h-8 mx-auto text-slate-400" />
            </div>
          </div>
        </div>
        {/* Top 3 Podium */}
       <section className="min-h-screen">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {sortedUsers.slice(0, 3).map((user, index) => {
            const positions = [1, 0, 2]; // Second, First, Third
            const actualIndex = positions[index];
            const podiumUser = sortedUsers[actualIndex];

            return (
              <div
                key={podiumUser?._id}
                className={`relative bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 transform transition-all duration-300 hover:scale-105 hover:bg-slate-700/60 ${
                  actualIndex === 0
                    ? "md:order-2 ring-2 ring-yellow-400/30"
                    : actualIndex === 1
                    ? "md:order-1"
                    : "md:order-3"
                }`}
              >
                <div className="text-center">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${
                      actualIndex === 0
                        ? "from-yellow-400 to-yellow-600"
                        : actualIndex === 1
                        ? "from-gray-300 to-gray-500"
                        : "from-amber-500 to-amber-700"
                    } flex items-center justify-center text-white font-bold text-xl`}
                  >
                    {actualIndex + 1}
                  </div>

                  <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden border-4 border-slate-600">
                    <img
                      src={podiumUser?.photo || "/api/placeholder/64/64"}
                      alt={podiumUser?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h3 className="text-white font-semibold text-lg mb-1">
                    {podiumUser?.name}
                  </h3>
                  <p className="text-slate-400 text-sm mb-2">Chittagong</p>
                  <div className="bg-slate-700/50 rounded-lg p-3">
                    <p className="text-2xl font-bold text-white">
                      {podiumUser?.point}
                    </p>
                    <p className="text-slate-400 text-sm">points</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Leaderboard Table */}
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden ">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-b border-slate-700/50">
                  <th className="text-left py-4 px-6 text-slate-300 font-semibold">
                    Rank
                  </th>
                  <th className="text-left py-4 px-6 text-slate-300 font-semibold">
                    Player
                  </th>
                  <th className="text-left py-4 px-6 text-slate-300 font-semibold">
                    Location
                  </th>
                  <th className="text-left py-4 px-6 text-slate-300 font-semibold">
                    Matches
                  </th>
                  <th className="text-left py-4 px-6 text-slate-300 font-semibold">
                    Points
                  </th>
                  <th className="text-left py-4 px-6 text-slate-300 font-semibold">
                    Improvement
                  </th>
                  <th className="text-left py-4 px-6 text-slate-300 font-semibold">
                    Badge
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedUsers.map((user, index) => {
                  const improvement =
                    user.previousPoint !== undefined
                      ? ((user.point - user.previousPoint) /
                          user.previousPoint) *
                        100
                      : 0;

                  return (
                    <tr
                      key={user._id}
                      className={`transition-all duration-300 hover:bg-slate-700/30 ${getRankStyle(
                        index
                      )}`}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <span
                            className={`text-2xl font-bold ${
                              index < 3 ? "text-white" : "text-slate-400"
                            }`}
                          >
                            {index + 1}
                          </span>
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-600">
                            <img
                              src={user.photo || "/api/placeholder/48/48"}
                              alt={user.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-semibold text-white">
                              {user.name}
                            </div>
                            <div className="text-sm text-slate-400">Player</div>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <span className="text-slate-300">Chittagong</span>
                      </td>

                      <td className="py-4 px-6">
                        <span className="text-white font-semibold">10</span>
                      </td>

                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-white">
                            {user.point}
                          </span>
                          <span className="text-slate-400 text-sm">pts</span>
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          {getImprovementIcon(improvement)}
                          <span
                            className={`font-semibold ${getImprovementColor(
                              improvement
                            )}`}
                          >
                            {user.previousPoint !== undefined
                              ? `${
                                  improvement > 0 ? "+" : ""
                                }${improvement.toFixed(1)}%`
                              : "N/A"}
                          </span>
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center">
                          {getBadgeIcon(index)}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h3 className="text-slate-400 text-sm mb-2">Total Players</h3>
            <p className="text-2xl font-bold text-white">
              {sortedUsers.length}
            </p>
          </div>
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h3 className="text-slate-400 text-sm mb-2">Average Points</h3>
            <p className="text-2xl font-bold text-white">
              {sortedUsers.length > 0
                ? Math.round(
                    sortedUsers.reduce((sum, user) => sum + user.point, 0) /
                      sortedUsers.length
                  )
                : 0}
            </p>
          </div>
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 ">
            <h3 className="text-slate-400 text-sm mb-2">Top Score</h3>
            <p className="text-2xl font-bold text-white">
              {sortedUsers.length > 0 ? sortedUsers[0].point : 0}
            </p>
          </div>
        </div>
       </section>
      </div>
    </div>
  );
};

export default LeaderBoard;
