/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */

import {
  Users,
  Target,
  Smartphone,
  MapPin,
  Trophy,
  Heart,
  Star,
  ChevronRight,
  Play,
  Award,
  Shield,
  Zap,
  ArrowDown,
  Sparkles,
  Globe,
  Clock,
  TrendingUp,
} from "lucide-react";
import { useState, useEffect } from "react";

const AboutUs = () => {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    setScrollY(scrollTop);
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: <Smartphone className="w-12 h-12 text-blue-400" />,
      title: "Cross-Platform App",
      description:
        "Seamless experience across iOS and Android with real-time updates, progress tracking, and gamified achievements to keep children engaged.",
      gradient: "from-blue-500/20 to-cyan-500/20",
      borderGradient: "from-blue-500/50 to-cyan-500/50",
      stats: "50K+ Downloads",
    },
    {
      icon: <MapPin className="w-12 h-12 text-green-400" />,
      title: "SHOISHOB ZONES",
      description:
        "Safe, supervised environments with professional equipment and trained staff, designed specifically for children's developmental needs.",
      gradient: "from-green-500/20 to-emerald-500/20",
      borderGradient: "from-green-500/50 to-emerald-500/50",
      stats: "10+ Locations",
    },
    {
      icon: <Trophy className="w-12 h-12 text-yellow-400" />,
      title: "Sports Tournaments",
      description:
        "Regular competitions with skill-based matching, achievement systems, and recognition programs that celebrate every child's progress.",
      gradient: "from-yellow-500/20 to-orange-500/20",
      borderGradient: "from-yellow-500/50 to-orange-500/50",
      stats: "20+ Events/Month",
    },
    {
      icon: <Users className="w-12 h-12 text-purple-400" />,
      title: "Community Building",
      description:
        "Foster lasting friendships through team activities, mentorship programs, and family engagement initiatives.",
      gradient: "from-purple-500/20 to-pink-500/20",
      borderGradient: "from-purple-500/50 to-pink-500/50",
      stats: "5K+ Families",
    },
  ];

  const benefits = [
    {
      text: "Improved physical health and fitness",
      icon: <Heart className="w-6 h-6 text-red-400" />,
      impact: "85% fitness improvement",
    },
    {
      text: "Enhanced emotional well-being",
      icon: <Star className="w-6 h-6 text-yellow-400" />,
      impact: "92% happiness increase",
    },
    {
      text: "Development of leadership qualities",
      icon: <Award className="w-6 h-6 text-blue-400" />,
      impact: "78% confidence boost",
    },
    {
      text: "Building self-confidence",
      icon: <Shield className="w-6 h-6 text-green-400" />,
      impact: "90% self-esteem growth",
    },
    {
      text: "Learning teamwork and communication",
      icon: <Users className="w-6 h-6 text-purple-400" />,
      impact: "94% social skills",
    },
    {
      text: "Developing resilience and determination",
      icon: <Zap className="w-6 h-6 text-orange-400" />,
      impact: "87% perseverance",
    },
  ];

  const stats = [
    {
      number: "10+",
      label: "Active Zones",
      icon: <MapPin className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      description: "Local locations",
    },
    {
      number: "500+",
      label: "Young Athletes",
      icon: <Users className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
      description: "Active participants",
    },
    {
      number: "10+",
      label: "Sports Available",
      icon: <Trophy className="w-8 h-8" />,
      color: "from-yellow-500 to-orange-500",
      description: "Different activities",
    },
    {
      number: "95%",
      label: "Parent Satisfaction",
      icon: <Heart className="w-8 h-8" />,
      color: "from-red-500 to-pink-500",
      description: "Positive feedback",
    },
  ];

  const milestones = [
    {
      year: "2027",
      title: "National Launch",
      description: "Expanded to 10+ City",
      icon: <Globe className="w-6 h-6" />,
    },
    {
      year: "2026",
      title: "Tech Innovation",
      description: "AI-powered matching system",
      icon: <Sparkles className="w-6 h-6" />,
    },
    {
      year: "2025",
      title: "Community Growth",
      description: "Reached 10,000 active users",
      icon: <TrendingUp className="w-6 h-6" />,
    },
    {
      year: "2024",
      title: "Foundation",
      description: "First SHOISHOB ZONE opened",
      icon: <Clock className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen  text-white overflow-hidden relative">
      {/* Animated Background Elements */}
    
        <div className="fixed top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>


      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <div className="relative py-24 flex items-center justify-center">
        <div className="relative max-w-8xl mx-auto px-8 py-20 text-center">
          {/* Badge */}
          <div className="mb-12 animate-fade-in">
            <span className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-full border border-blue-500/50 text-blue-300 font-medium text-xl backdrop-blur-sm">
              <Sparkles className="w-5 h-5 mr-3 animate-spin-slow" />
              Transforming Childhood Through Active Play
              <Sparkles className="w-5 h-5 ml-3 animate-spin-slow" />
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black text-white mb-12 leading-tight ">
                  Shoishob
                  <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 text-transparent bg-clip-text animate-pulse">
                    Zones
                  </span>
                </h1>

                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-12" />

          {/* Subtitle */}
          <div className="max-w-6xl mx-auto mb-16 animate-fade-in-up delay-300">
            <p className="text-2xl lg:text-3xl xl:text-3xl text-slate-200 leading-relaxed font-light mb-16">
              Breaking the screen addiction cycle by creating
              <span className="text-white  font-bold">
                {" "}
                revolutionary sports experiences{" "}
              </span>
              that build healthier, happier childhoods through community and
              competition.
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
            <button className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-12 py-6 rounded-2xl font-bold text-xl transition-all transform hover:scale-105 hover:-translate-y-1 shadow-2xl hover:shadow-blue-500/30 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center justify-center">
                <Play className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                Start Your Journey
              </div>
            </button>
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

      {/* Mission Section */}
      <div className="relative py-32 backdrop-blur-sm">
        <div className=" px-8 max-w-screen-2xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="flex items-center mb-12">
                <div className="relative">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-20 h-20 rounded-3xl flex items-center justify-center mr-6 shadow-2xl">
                    <Target className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur opacity-30 animate-pulse" />
                </div>
                <h2 className="text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  Our Mission
                </h2>
              </div>

              <div className="space-y-8 text-xl lg:text-2xl text-slate-300 leading-relaxed">
                <div className="p-8 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-2xl border border-red-500/20">
                  <p>
                    We're tackling the{" "}
                    <span className="text-red-400 font-bold text-2xl">
                      growing epidemic of screen addiction
                    </span>{" "}
                    and physical inactivity affecting today's children by
                    creating accessible, engaging opportunities for sports and
                    recreation.
                  </p>
                </div>

                <div className="p-8 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-2xl border border-green-500/20">
                  <p>
                    Our comprehensive approach promotes physical activity that
                    transforms children's{" "}
                    <span className="text-green-400 font-bold">
                      physical health
                    </span>
                    ,{" "}
                    <span className="text-blue-400 font-bold">
                      emotional resilience
                    </span>
                    , and{" "}
                    <span className="text-purple-400 font-bold">
                      social connections
                    </span>
                    .
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-3xl blur-xl" />
              <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-700/90 rounded-3xl p-10 border border-slate-600/50 backdrop-blur-sm shadow-2xl">
                <h3 className="text-3xl lg:text-4xl font-bold mb-10 text-center bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Life-Changing Benefits
                </h3>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="group flex items-center justify-between p-5 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-slate-600/50 hover:bg-slate-700/50 transition-all cursor-pointer"
                    >
                      <div className="flex items-center">
                        <div className="mr-4 group-hover:scale-110 transition-transform">
                          {benefit.icon}
                        </div>
                        <span className="text-slate-200 text-lg font-medium">
                          {benefit.text}
                        </span>
                      </div>
                      <span className="text-sm text-slate-400 font-medium px-3 py-1 bg-slate-700/50 rounded-full">
                        {benefit.impact}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative py-32">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="text-center mb-24">
            <h2 className="text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Revolutionary Platform
            </h2>
            <p className="text-2xl lg:text-3xl text-slate-300 max-w-6xl mx-auto leading-relaxed">
              Technology meets physical activity to create the most engaging
              sports experience for children
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="group relative">
                <div
                  className={`absolute -inset-1 bg-gradient-to-r ${feature.borderGradient} rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                <div
                  className={`relative bg-gradient-to-br ${feature.gradient} rounded-3xl p-10 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-500 hover:scale-105 shadow-2xl hover:shadow-3xl backdrop-blur-sm h-full`}
                >
                  <div className="flex items-start justify-between mb-8">
                    <div className="group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <span className="text-sm font-bold px-3 py-1 bg-white/20 rounded-full backdrop-blur-sm">
                      {feature.stats}
                    </span>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold mb-6 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-slate-200 text-lg lg:text-xl leading-relaxed mb-6">
                    {feature.description}
                  </p>
                  <div className="flex items-center text-sm text-slate-300 font-medium">
                    <ChevronRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                    Learn more
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative py-32 max-w-screen-2xl mx-auto">
        <div className="max-w-8xl mx-auto px-8">
          <div className="text-center mb-24">
            <h2 className="text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Massive Impact
            </h2>
            <p className="text-2xl lg:text-3xl text-slate-300">
              Transforming lives across communities worldwide
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="relative mb-8">
                  <div
                    className={`bg-gradient-to-br ${stat.color} w-28 h-28 lg:w-32 lg:h-32 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-2xl`}
                  >
                    {stat.icon}
                  </div>
                  <div
                    className={`absolute -inset-1 bg-gradient-to-br ${stat.color} rounded-3xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300`}
                  />
                </div>
                <div className="text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-4 group-hover:scale-110 transition-transform">
                  {stat.number}
                </div>
                <div className="text-slate-300 text-xl lg:text-2xl font-bold mb-2">
                  {stat.label}
                </div>
                <div className="text-slate-400 text-sm">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="relative py-32">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-24">
            <h2 className="text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Our Journey
            </h2>
            <p className="text-2xl text-slate-300">
              Milestones that shaped our mission
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />

            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`relative flex items-center mb-16 ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <div
                  className={`w-1/2 ${
                    index % 2 === 0 ? "pr-12 text-right" : "pl-12 text-left"
                  }`}
                >
                  <div className="bg-gradient-to-br from-slate-800/90 to-slate-700/90 p-8 rounded-2xl border border-slate-600/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                    <div className="flex items-center mb-4 justify-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
                        {milestone.icon}
                      </div>
                      <span className="text-3xl font-bold text-blue-400">
                        {milestone.year}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-slate-300">{milestone.description}</p>
                  </div>
                </div>

                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-slate-900 shadow-xl" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="relative py-32 ">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-16">
              <div className="relative">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 w-24 h-24 rounded-3xl flex items-center justify-center mr-6 shadow-2xl">
                  <Star className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl blur opacity-30 animate-pulse" />
              </div>
              <h2 className="text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Our Vision
              </h2>
            </div>

            <div className="relative max-w-6xl mx-auto">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl" />
              <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-700/90 rounded-3xl p-12 lg:p-16 border border-slate-600/50 backdrop-blur-sm shadow-2xl">
                <div className="space-y-10 text-xl lg:text-2xl text-slate-200 leading-relaxed">
                  <p>
                    We envision a world where children naturally choose{" "}
                    <span className="text-green-400 font-bold text-2xl">
                      active play over screen time
                    </span>
                    , where SHOISHOB ZONES become vibrant community hubs
                    fostering personal growth, friendship, and healthy
                    competition.
                  </p>
                  <p>
                    Our technology-enhanced approach incorporates{" "}
                    <span className="text-blue-400 font-bold text-2xl">
                      gamification elements
                    </span>{" "}
                    to make physical activity as captivating as digital
                    entertainment, while building crucial life skills like
                    teamwork, communication, and resilience.
                  </p>
                </div>

                <div className="mt-16 relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-2xl blur" />
                  <div className="relative bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-2xl p-10 border border-blue-500/30 backdrop-blur-sm">
                    <div className="text-3xl lg:text-4xl font-bold text-blue-300 mb-6 flex items-center justify-center">
                      <Award className="w-8 h-8 mr-4" />
                      Our Promise
                    </div>
                    <p className="text-xl lg:text-2xl font-medium text-blue-200 italic leading-relaxed text-center">
                      "Our project's primary objective is to promote physical
                      activity and sports among children while providing
                      accessible and engaging opportunities that foster personal
                      growth and development. We believe our approach will
                      benefit individual children and create a positive impact
                      on the community as a whole."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="relative py-32">
        <div className="max-w-6xl mx-auto px-8 text-center">
          <h2 className="text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
            Join the Revolution
          </h2>
          <p className="text-2xl lg:text-3xl text-slate-300 mb-16 leading-relaxed max-w-4xl mx-auto">
            Be part of creating healthier, more active communities for the next
            generation. Together, we can transform childhood experiences.
          </p>

          <div className="flex flex-col sm:flex-row gap-8 justify-center mb-12">
            <button className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-16 py-8 rounded-2xl font-bold text-2xl transition-all transform hover:scale-105 hover:-translate-y-2 shadow-2xl hover:shadow-blue-500/30 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center justify-center">
                <MapPin className="w-8 h-8 mr-4 group-hover:bounce" />
                Find Your SHOISHOB ZONE
              </div>
            </button>
            <button className="group bg-slate-800/80 hover:bg-slate-700/80 border-2 border-slate-600 hover:border-blue-500/50 px-16 py-8 rounded-2xl font-bold text-2xl transition-all backdrop-blur-sm hover:shadow-xl hover:shadow-blue-500/10 hover:scale-105">
              <div className="flex items-center justify-center">
                <ChevronRight className="w-8 h-8 mr-4 group-hover:translate-x-2 transition-transform" />
                Learn More
              </div>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 backdrop-blur-sm">
              <Clock className="w-8 h-8 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Quick Start</h3>
              <p className="text-slate-300">Get started in under 5 minutes</p>
            </div>
            <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 backdrop-blur-sm">
              <Shield className="w-8 h-8 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">
                Safe Environment
              </h3>
              <p className="text-slate-300">Fully supervised and secure</p>
            </div>
            <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 backdrop-blur-sm">
              <Heart className="w-8 h-8 text-red-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">
                Community Support
              </h3>
              <p className="text-slate-300">Join thousands of families</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
