/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import {
  Calendar,
  MapPin,
  Users,
  Mail,
  Phone,
  DollarSign,
  Trophy,
  Star,
  Clock,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import TournamentSkeleton from "../Skeletons/TournamentSkeleton";
import TournamentSponsors from "./TournamentSponsers";

const TournamentBooking = () => {
  const { id } = useParams();
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const { data: tournamentDetails, isLoading } = useQuery(
    ["tournamentDetails", id],
    async () => {
      const res = await axios.get(
        `${backendURL}/api/v1/tournament-details/${id}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      return res.data.data;
    }
  );
  // Replace with your loading state

  if (isLoading) {
    return <TournamentSkeleton />;
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 "></div>
        <div className="relative container mx-auto px-6 py-16">
          <div className="max-w-6xl mx-auto">
            {/* Cover Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-12 group">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent z-10"></div>
              <img
                alt="Tournament Cover"
                className="w-full h-80 md:h-96 object-cover object-center transition-transform duration-700 group-hover:scale-105"
                src={tournamentDetails?.cover}
              />
              <div className="absolute bottom-8 left-8 z-20">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1">
                      <img
                        src={tournamentDetails?.logo}
                        alt="Tournament Logo"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
                      <Trophy className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                      {tournamentDetails?.tournament_name}
                    </h1>
                    <div className="flex items-center text-gray-300">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>
                        {tournamentDetails?.address}, Chittagong, Bangladesh
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Tournament Details */}
              <div className="lg:col-span-2 space-y-8">
                {/* About Section */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <Star className="w-6 h-6 mr-3 text-yellow-500" />
                    About Tournament
                  </h2>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {tournamentDetails?.about}
                  </p>
                </div>

                {/* Rules Section */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <Clock className="w-6 h-6 mr-3 text-purple-500" />
                    Tournament Rules
                  </h2>
                  <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-l-4 border-purple-500 rounded-r-lg p-6">
                    <p className="text-gray-300 italic text-lg leading-relaxed">
                      "{tournamentDetails?.rules}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Tournament Info Cards */}
              <div className="space-y-6">
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                  <h3 className="text-xl font-bold text-white mb-6 text-center">
                    Tournament Details
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center p-4 bg-slate-700/30 rounded-lg border border-slate-600/30 hover:border-green-500/40 transition-colors">
                      <Calendar className="w-5 h-5 text-green-500 mr-4 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-400">
                          Registration Starts
                        </p>
                        <p className="text-white font-medium">
                          {tournamentDetails?.registration_start}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center p-4 bg-slate-700/30 rounded-lg border border-slate-600/30 hover:border-red-500/40 transition-colors">
                      <Calendar className="w-5 h-5 text-red-500 mr-4 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-400">
                          Registration Ends
                        </p>
                        <p className="text-white font-medium">
                          {tournamentDetails?.registration_end}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center p-4 bg-slate-700/30 rounded-lg border border-slate-600/30 hover:border-yellow-500/40 transition-colors">
                      <DollarSign className="w-5 h-5 text-yellow-500 mr-4 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-400">
                          Registration Fee
                        </p>
                        <p className="text-white font-medium">
                          {tournamentDetails?.price} BDT
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center p-4 bg-slate-700/30 rounded-lg border border-slate-600/30 hover:border-blue-500/40 transition-colors">
                      <Users className="w-5 h-5 text-blue-500 mr-4 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-400">Maximum Players</p>
                        <p className="text-white font-medium">
                          {tournamentDetails?.person} Players + 1 extra
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center p-4 bg-slate-700/30 rounded-lg border border-slate-600/30 hover:border-cyan-500/40 transition-colors">
                      <Mail className="w-5 h-5 text-cyan-500 mr-4 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-400">Email</p>
                        <p className="text-white font-medium break-all">
                          {tournamentDetails?.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center p-4 bg-slate-700/30 rounded-lg border border-slate-600/30 hover:border-pink-500/40 transition-colors">
                      <Phone className="w-5 h-5 text-pink-500 mr-4 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-400">Contact Number</p>
                        <p className="text-white font-medium">
                          {tournamentDetails?.ownerPhone}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Registration Button */}
                <Link to={`/registration-form/${tournamentDetails?._id}`}>
                  <button
                    onClick={() => {
                      // Replace this with your navigation logic
                      console.log(
                        `Navigate to registration form for tournament: ${tournamentDetails?._id}`
                      );
                    }}
                    className="block w-full"
                  >
                    <div className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-blue-500/25 cursor-pointer">
                      <div className="flex items-center justify-center space-x-2">
                        <Trophy className="w-5 h-5" />
                        <span>REGISTER NOW</span>
                      </div>
                    </div>
                  </button>
                </Link>

              </div>
            </div>
          </div>
        </div>
        <div className="fixed top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>

        <div className="fixed z-10 max-w-screen-xl mx-auto px-4 md:px-8"></div>
      </section>
      <TournamentSponsors/>
    </div>
  );
};

export default TournamentBooking;
