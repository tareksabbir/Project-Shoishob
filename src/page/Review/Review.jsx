/* eslint-disable react/no-unknown-property */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useState, useMemo } from "react";
import {
  Star,
  ThumbsUp,
  ThumbsDown,
  Filter,
  Search,
  Plus,
  User,
  MapPin,
  Trophy,
  Heart,
  Calendar,
  Award,
  Target,
  Users,
  Sparkles,
  ChevronDown,
  ArrowDown,
  Play,
} from "lucide-react";
import { Link } from "react-router-dom";

const ReviewPage = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Sarah Ahmed",
      rating: 5,
      date: "2024-05-20",
      title: "Amazing experience for my kids!",
      content:
        "My 8-year-old son has been participating in SHOISHOB tournaments for 3 months now. The improvement in his confidence and social skills is remarkable! He's made so many friends and actually asks to go outside and play instead of being glued to his tablet. The zones are well-maintained and safe.",
      helpful: 24,
      notHelpful: 1,
      verified: true,
      parentReview: true,
      zone: "Dhanmondi Zone",
      activity: "Football Tournament",
    },
    {
      id: 2,
      name: "Rafiq Hassan",
      rating: 5,
      date: "2024-05-18",
      title: "Perfect solution for screen addiction",
      content:
        "As a parent, I was worried about my daughter's excessive screen time. SHOISHOB has been a game-changer! She now spends 2-3 hours daily in physical activities. The app's gamification features motivate her to stay active. Highly recommend to all parents!",
      helpful: 18,
      notHelpful: 0,
      verified: true,
      parentReview: true,
      zone: "Gulshan Zone",
      activity: "Cricket & Athletics",
    },
    {
      id: 3,
      name: "Aisha (Age 12)",
      rating: 5,
      date: "2024-05-15",
      title: "I love the tournaments!",
      content:
        "The badminton tournaments are so much fun! I've made lots of new friends and my coach says I'm getting really good. The app shows my progress and I love collecting points. Can't wait for the next tournament!",
      helpful: 31,
      notHelpful: 2,
      verified: true,
      parentReview: false,
      zone: "Uttara Zone",
      activity: "Badminton Championship",
    },
    {
      id: 4,
      name: "Dr. Mahmuda Khatun",
      rating: 4,
      date: "2024-05-12",
      title: "Great initiative with room for improvement",
      content:
        "SHOISHOB is addressing a real problem in our society. My twin boys (age 10) have become more active and healthier. The concept is excellent, though I'd like to see more variety in sports offered. The community aspect is wonderful - kids are learning teamwork and leadership.",
      helpful: 15,
      notHelpful: 3,
      verified: true,
      parentReview: true,
      zone: "Mirpur Zone",
      activity: "Multi-Sport Events",
    },
    {
      id: 5,
      name: "Karim (Age 14)",
      rating: 5,
      date: "2024-05-10",
      title: "Best thing that happened to me!",
      content:
        "I used to spend 8+ hours gaming daily. Now I'm captain of my zone's basketball team! My parents are so proud and I feel much stronger and confident. The app tracking system is cool and helps me set goals.",
      helpful: 28,
      notHelpful: 1,
      verified: true,
      parentReview: false,
      zone: "Wari Zone",
      activity: "Basketball League",
    },
    {
      id: 6,
      name: "Fatema Rahman",
      rating: 4,
      date: "2024-05-08",
      title: "Positive impact on child development",
      content:
        "My shy 9-year-old daughter has blossomed since joining SHOISHOB activities. She's more confident, has better communication skills, and her physical health has improved significantly. The coaches are patient and encouraging.",
      helpful: 12,
      notHelpful: 1,
      verified: true,
      parentReview: true,
      zone: "Banani Zone",
      activity: "Swimming & Gymnastics",
    },
    {
      id: 7,
      name: "Rafi (Age 11)",
      rating: 5,
      date: "2024-05-05",
      title: "So much better than video games!",
      content:
        "Football practice is the best part of my day now! I've learned teamwork and made best friends. My stamina has improved a lot and I sleep better at night. Thank you SHOISHOB for making sports so fun!",
      helpful: 22,
      notHelpful: 0,
      verified: true,
      parentReview: false,
      zone: "Tejgaon Zone",
      activity: "Football Training",
    },
    {
      id: 8,
      name: "Nasir Ahmed",
      rating: 3,
      date: "2024-05-02",
      title: "Good concept, needs more zones",
      content:
        "The idea is brilliant and my son loves it, but the nearest zone is quite far from our area. Hope they expand to more locations soon. The activities are well-organized and safe.",
      helpful: 9,
      notHelpful: 4,
      verified: true,
      parentReview: true,
      zone: "Motijheel Zone",
      activity: "Table Tennis",
    },
  ]);

  const [sortBy, setSortBy] = useState("newest");
  const [filterRating, setFilterRating] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddReview, setShowAddReview] = useState(false);
  const [helpfulVotes, setHelpfulVotes] = useState({});

  // Calculate statistics
  const stats = useMemo(() => {
    const totalReviews = reviews.length;
    const averageRating =
      reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;
    const ratingCounts = [5, 4, 3, 2, 1].map(
      (rating) => reviews.filter((review) => review.rating === rating).length
    );
    const parentReviews = reviews.filter(
      (review) => review.parentReview
    ).length;
    const childReviews = reviews.filter(
      (review) => !review.parentReview
    ).length;

    return {
      totalReviews,
      averageRating,
      ratingCounts,
      parentReviews,
      childReviews,
    };
  }, [reviews]);

  // Filter and sort reviews
  const filteredReviews = useMemo(() => {
    let filtered = reviews.filter((review) => {
      const matchesSearch =
        review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRating =
        filterRating === "all" || review.rating === parseInt(filterRating);
      const matchesType =
        filterType === "all" ||
        (filterType === "parents" && review.parentReview) ||
        (filterType === "children" && !review.parentReview);

      return matchesSearch && matchesRating && matchesType;
    });

    // Sort reviews
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.date) - new Date(a.date);
        case "oldest":
          return new Date(a.date) - new Date(b.date);
        case "highest":
          return b.rating - a.rating;
        case "lowest":
          return a.rating - b.rating;
        case "helpful":
          return b.helpful - a.helpful;
        default:
          return 0;
      }
    });

    return filtered;
  }, [reviews, searchTerm, filterRating, filterType, sortBy]);

  const handleHelpfulVote = (reviewId, isHelpful) => {
    if (helpfulVotes[reviewId]) return; // Already voted

    setReviews((prev) =>
      prev.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              helpful: isHelpful ? review.helpful + 1 : review.helpful,
              notHelpful: !isHelpful
                ? review.notHelpful + 1
                : review.notHelpful,
            }
          : review
      )
    );

    setHelpfulVotes((prev) => ({ ...prev, [reviewId]: isHelpful }));
  };

  const renderStars = (rating, size = "w-5 h-5") => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size} transition-all duration-200 ${
              star <= rating
                ? "fill-amber-400 text-amber-400 drop-shadow-sm"
                : "text-slate-600"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-600/20 to-teal-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-violet-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>
      <div className="relative bg-nearest-rgb-23-32-49   max-w-screen-2xl mx-auto">
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
              Hear From Our
              <span className="block bg-gradient-to-r from-green-400  to-cyan-500 text-transparent bg-clip-text animate-pulse">
                Users
              </span>
            </h1>

            <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-cyan-400 mx-auto rounded-full mb-12" />

            {/* Subtitle */}
            <div className="max-w-6xl mx-auto mb-16 animate-fade-in-up delay-300">
              <p className="text-2xl lg:text-3xl xl:text-3xl text-slate-200 leading-relaxed font-light mb-16">
                Real stories from parents and kids who transformed screen
                addiction into sports passion.
                <span className="text-white  font-bold">
                  {" "}
                  Discover how our community-driven tournaments and activities
                  are building confident,{" "}
                </span>
                healthy children across Bangladesh through organized play and
                peer connection.
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
              <Link
                to={"/turf/64d2650c1da87da8565d0f55"}
                className="group bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600 hover:border-blue-500/50 px-12 py-6 rounded-2xl font-bold text-xl transition-all backdrop-blur-sm hover:shadow-xl hover:shadow-blue-500/10"
              >
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
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-6 mb-32">
        {/* Hero Header */}
        <div className="relative bg-gradient-to-br from-slate-800/90 via-slate-800/95 to-slate-900/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 mb-8 border border-slate-700/50 overflow-hidden">
          {/* Header Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-10"></div>
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
            >
              <defs>
                <pattern
                  id="grid"
                  width="10"
                  height="10"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 10 0 L 0 0 0 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  SHOISHOB Reviews
                </h1>
                <p className="text-slate-400 text-lg mt-1">
                  Transforming screen addiction into sports passion
                </p>
              </div>
            </div>

            {/* Enhanced Statistics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="group relative bg-gradient-to-br from-emerald-500/10 to-teal-500/10 backdrop-blur-sm p-6 rounded-xl border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 text-center">
                  <div className="flex items-center justify-center mb-3">
                    <Award className="w-8 h-8 text-emerald-400 mr-2" />
                    <div className="text-3xl font-bold text-emerald-400">
                      {stats.averageRating.toFixed(1)}
                    </div>
                  </div>
                  <div className="flex justify-center mb-2">
                    {renderStars(Math.round(stats.averageRating))}
                  </div>
                  <div className="text-sm text-slate-400 font-medium">
                    Average Rating
                  </div>
                </div>
              </div>

              <div className="group relative bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 text-center">
                  <div className="flex items-center justify-center mb-3">
                    <Users className="w-8 h-8 text-blue-400 mr-2" />
                    <div className="text-3xl font-bold text-blue-400">
                      {stats.totalReviews}
                    </div>
                  </div>
                  <div className="text-sm text-slate-400 font-medium">
                    Total Reviews
                  </div>
                </div>
              </div>

              <div className="group relative bg-gradient-to-br from-purple-500/10 to-violet-500/10 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-violet-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 text-center">
                  <div className="flex items-center justify-center mb-3">
                    <Heart className="w-8 h-8 text-purple-400 mr-2" />
                    <div className="text-3xl font-bold text-purple-400">
                      {stats.parentReviews}
                    </div>
                  </div>
                  <div className="text-sm text-slate-400 font-medium">
                    Parent Reviews
                  </div>
                </div>
              </div>

              <div className="group relative bg-gradient-to-br from-orange-500/10 to-amber-500/10 backdrop-blur-sm p-6 rounded-xl border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 text-center">
                  <div className="flex items-center justify-center mb-3">
                    <Target className="w-8 h-8 text-orange-400 mr-2" />
                    <div className="text-3xl font-bold text-orange-400">
                      {stats.childReviews}
                    </div>
                  </div>
                  <div className="text-sm text-slate-400 font-medium">
                    Child Reviews
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Rating Distribution */}
            <div className="mt-8 bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50">
              <h3 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-400" />
                Rating Distribution
              </h3>
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((rating, index) => (
                  <div key={rating} className="flex items-center gap-4 group">
                    <span className="text-sm font-medium w-4 text-slate-300">
                      {rating}
                    </span>
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <div className="flex-1 bg-slate-700/50 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-amber-400 to-orange-400 h-2.5 rounded-full transition-all duration-1000 ease-out shadow-sm"
                        style={{
                          width: `${
                            (stats.ratingCounts[index] / stats.totalReviews) *
                            100
                          }%`,
                          animationDelay: `${index * 0.1}s`,
                        }}
                      ></div>
                    </div>
                    <span className="text-sm text-slate-400 w-8 font-medium">
                      {stats.ratingCounts[index]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Filters Section */}
        <div className="bg-gradient-to-br from-slate-800/90 via-slate-800/95 to-slate-900/90 backdrop-blur-xl rounded-2xl shadow-xl p-6 mb-8 border border-slate-700/50">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Enhanced Search */}
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5 group-focus-within:text-emerald-400 transition-colors" />
              <input
                type="text"
                placeholder="Search reviews, names, or activities..."
                className="w-full pl-12 pr-4 py-3 bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 focus:bg-slate-700/70 transition-all duration-200 text-white placeholder-slate-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Enhanced Filter Controls */}
            <div className="flex gap-3">
              <div className="relative">
                <select
                  className="appearance-none px-4 py-3 bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 text-white pr-10 cursor-pointer hover:bg-slate-700/70 transition-all"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="highest">Highest Rating</option>
                  <option value="lowest">Lowest Rating</option>
                  <option value="helpful">Most Helpful</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  className="appearance-none px-4 py-3 bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 text-white pr-10 cursor-pointer hover:bg-slate-700/70 transition-all"
                  value={filterRating}
                  onChange={(e) => setFilterRating(e.target.value)}
                >
                  <option value="all">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  className="appearance-none px-4 py-3 bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 text-white pr-10 cursor-pointer hover:bg-slate-700/70 transition-all"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="all">All Reviews</option>
                  <option value="parents">Parents Only</option>
                  <option value="children">Children Only</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>

              <button
                onClick={() => setShowAddReview(true)}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 flex items-center gap-2 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105"
              >
                <Plus className="w-4 h-4" />
                Add Review
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Reviews List */}
        <div className="space-y-6">
          {filteredReviews.map((review, index) => (
            <div
              key={review.id}
              className="group relative bg-gradient-to-br from-slate-800/90 via-slate-800/95 to-slate-900/90 backdrop-blur-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-700/50 hover:border-slate-600/70 overflow-hidden hover:scale-[1.02]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Card Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10 p-6">
                {/* Enhanced Review Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {review.name.charAt(0)}
                      </div>
                      {review.verified && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center border-2 border-slate-800">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg text-white">
                          {review.name}
                        </h3>
                        <div className="flex gap-2">
                          {review.parentReview ? (
                            <span className="bg-gradient-to-r from-purple-500/20 to-violet-500/20 text-purple-300 px-3 py-1 rounded-full text-xs font-medium border border-purple-500/30">
                              👨‍👩‍👧‍👦 Parent
                            </span>
                          ) : (
                            <span className="bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-300 px-3 py-1 rounded-full text-xs font-medium border border-orange-500/30">
                              🧒 Child
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {renderStars(review.rating)}
                        <span className="text-sm text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(review.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Zone and Activity Info */}
                <div className="flex items-center gap-6 mb-4 p-3 bg-slate-700/30 rounded-lg border border-slate-600/30">
                  <div className="flex items-center gap-2 text-sm text-emerald-300">
                    <MapPin className="w-4 h-4" />
                    <span className="font-medium">{review.zone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-teal-300">
                    <Trophy className="w-4 h-4" />
                    <span className="font-medium">{review.activity}</span>
                  </div>
                </div>

                {/* Enhanced Review Content */}
                <h4 className="font-semibold text-xl text-white mb-3 leading-tight">
                  {review.title}
                </h4>
                <p className="text-slate-300 mb-6 leading-relaxed text-base">
                  {review.content}
                </p>

                {/* Enhanced Review Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-600/50">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleHelpfulVote(review.id, true)}
                      className={`group flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                        helpfulVotes[review.id] === true
                          ? "bg-gradient-to-r from-emerald-600/30 to-green-600/30 text-emerald-300 border border-emerald-500/50 shadow-lg shadow-emerald-500/20"
                          : "hover:bg-slate-700/50 text-slate-400 border border-slate-600/50 hover:border-slate-500/70 hover:text-slate-300"
                      }`}
                      disabled={helpfulVotes[review.id] !== undefined}
                    >
                      <ThumbsDown className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium">
                        Not Helpful ({review.notHelpful})
                      </span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Users className="w-3 h-3" />
                    <span>
                      {review.helpful + review.notHelpful} people found this
                      review helpful
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced No Results State */}
        {filteredReviews.length === 0 && (
          <div className="text-center py-16 bg-gradient-to-br from-slate-800/90 via-slate-800/95 to-slate-900/90 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-700/50">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Search className="w-12 h-12 text-slate-400" />
              </div>
              <div className="absolute -top-2 -right-8 w-8 h-8 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-full blur-sm"></div>
              <div className="absolute -bottom-4 -left-6 w-6 h-6 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-full blur-sm"></div>
            </div>
            <h3 className="text-2xl font-semibold text-slate-300 mb-3">
              No reviews found
            </h3>
            <p className="text-slate-400 mb-6 max-w-md mx-auto">
              We couldn't find any reviews matching your search criteria. Try
              adjusting your filters or search terms.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterRating("all");
                setFilterType("all");
                setSortBy("newest");
              }}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Enhanced Add Review Modal */}
        {showAddReview && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="relative bg-gradient-to-br from-slate-800/95 via-slate-800/98 to-slate-900/95 backdrop-blur-xl rounded-2xl p-8 w-full max-w-lg border border-slate-700/50 shadow-2xl transform animate-scaleIn">
              {/* Modal Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 rounded-2xl"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                    <Plus className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white">
                      Share Your Experience
                    </h3>
                    <p className="text-slate-400 text-sm">
                      Help other families discover SHOISHOB
                    </p>
                  </div>
                </div>

                <div className="bg-slate-700/30 p-6 rounded-xl border border-slate-600/30 mb-6">
                  <p className="text-slate-300 leading-relaxed">
                    Your review helps other parents and children discover how
                    SHOISHOB can transform screen addiction into healthy, active
                    lifestyles. Share your story and inspire our community!
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowAddReview(false)}
                    className="flex-1 px-6 py-3 border border-slate-600/50 rounded-xl hover:bg-slate-700/50 hover:border-slate-500/70 transition-all duration-200 text-slate-300 hover:text-white"
                  >
                    Maybe Later
                  </button>
                  <button
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
                    onClick={() => setShowAddReview(false)}
                  >
                    Write Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ReviewPage;
