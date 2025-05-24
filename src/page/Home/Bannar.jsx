/* eslint-disable react/no-unescaped-entities */

import { ArrowDown, MapPin, Play, Sparkles, Trophy, Users } from "lucide-react";
import { Link } from "react-router-dom";


export default function Bannar() {
  return (
    <>
      <main className="relative bg-nearest-rgb-23-32-49   max-w-screen-2xl mx-auto">
        <div className="fixed top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>

        <div className="fixed z-10 max-w-screen-xl mx-auto px-4 md:px-8"></div>

      <div className="relative py-24 flex items-center justify-center">
        <div className="relative max-w-8xl mx-auto px-8 py-20 text-center">
          {/* Badge */}
          <div className="mb-12 animate-fade-in">
            <span className="inline-flex items-center px-8 py-4  rounded-full border border-blue-500/50 text-blue-300 font-medium text-xs md:text-xl backdrop-blur-sm">
              <Sparkles className="w-5 h-5 mr-3 animate-spin-slow" />
              Transforming Childhood Through Active Play
              <Sparkles className="w-5 h-5 ml-3 animate-spin-slow" />
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-6xl sm:text-6xl lg:text-8xl font-black text-white mb-12 leading-tight ">
                  The Magic We
                  <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 text-transparent bg-clip-text animate-pulse">
                    Once Knew.
                  </span>
                </h1>

                <div className="w-24 h-1 bg-gradient-to-r from-blue-300 to-purple-400 mx-auto rounded-full mb-12" />

          {/* Subtitle */}
          <div className="max-w-6xl mx-auto mb-16 animate-fade-in-up delay-300">
            <p className="text-2xl lg:text-3xl xl:text-3xl text-slate-200 leading-relaxed font-light mb-16">
              Childhood friends are irreplaceable. Life may scatter your squad, but the bond stays strong. Our platform reconnects
              <span className="text-white  font-bold">
                {" "}
                you with those who made growing up unforgettable {" "}
              </span>
              —bringing back the joy, laughter, and laughter of childhood.
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
            <Link to={"/booking"} className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-12 py-6 rounded-2xl font-bold text-xl transition-all transform hover:scale-105 hover:-translate-y-1 shadow-2xl hover:shadow-blue-500/30 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center justify-center">
                <Play className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                Start Your Journey
              </div>
            </Link>
            <Link to={"/turf/64d2650c1da87da8565d0f55"} className="group bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600 hover:border-blue-500/50 px-12 py-6 rounded-2xl font-bold text-xl transition-all backdrop-blur-sm hover:shadow-xl hover:shadow-blue-500/10">
              <div className="flex items-center justify-center">
                <MapPin className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                Explore Zones
              </div>
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div className="animate-bounce">
            <ArrowDown className="w-8 h-8 mx-auto text-slate-400" />
          </div>
        </div>
      </div>
      </main>
    </>
  );
}
