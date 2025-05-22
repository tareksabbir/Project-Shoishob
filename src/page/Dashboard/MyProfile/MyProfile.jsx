/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { 
  Edit3, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Award, 
  TrendingUp, 
  Users, 
  Camera, 
  Settings, 
  Mail, 
  Phone,
  Sparkles,
  Heart,
  Star,
  Globe,
  Calendar,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import Loading from "../../Loading/Loading";
import { AuthContext } from "../../../Context/AuthProvider";

const MyProfile = () => {
  const [showMore, setShowMore] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const { user, loading } = useContext(AuthContext);
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const { data: userData, isLoading: userDataLoading, error } = useQuery(
    ["userData", user?.email],
    async () => {
      if (!user?.email) return null;

      const res = await axios.get(
        `${API_URL}/api/v1/user/email/${user?.email}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      console.log(res.data.data);
      return res.data.data;
    },
    {
      enabled: !!user?.email,
    }
  );

  // Fallback data structure for missing fields
  const profileData = {
    name: userData?.name || "User Name",
    title: userData?.title || userData?.profession || "Professional",
    company: userData?.company || userData?.workplace || "Company Name",
    location: userData?.location || userData?.address || "Location",
    education: userData?.education || userData?.university || "Educational Institution",
    bio: userData?.bio || userData?.description || "Professional bio will be displayed here.",
    extendedBio: userData?.extendedBio || " Additional information about professional experience and achievements.",
    phone: userData?.phone || userData?.phoneNumber,
    joinDate: userData?.joinDate || "2024",
    stats: {
      projects: userData?.projects || userData?.totalProjects || 0,
      experience: userData?.experience || userData?.yearsOfExperience || "0 Years",
      rating: userData?.rating || userData?.avgRating || "N/A",
      followers: userData?.followers || userData?.connections || 0
    },
    skills: userData?.skills || userData?.technologies || [],
    achievements: userData?.achievements || [
      { title: "Professional", icon: Award },
      { title: "Team Player", icon: Users },
      { title: "Growth", icon: TrendingUp }
    ]
  };

  const handleUpdateProfile = () => {
    setIsEditing(!isEditing);
  };

  const handleSeeMoreClick = () => {
    setShowMore(!showMore);
  };

  if (loading || userDataLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="text-red-400 text-xl mb-4">Error loading profile</div>
          <div className="text-gray-300">{error.message}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Welcome Banner */}
      {showWelcome && (
        <div className="relative z-20 mx-4 mt-4">
          <div className="bg-gradient-to-r from-blue-600/90 to-blue-500/90 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">
                    Welcome to Shoishob Platform! 🎉
                  </h2>
                  <p className="text-blue-100">
                    Discover, connect, and grow with our vibrant community
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowWelcome(false)}
                className="text-white/70 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section with Glass Effect */}
      <div className="relative h-80 overflow-hidden mt-6 mx-4">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
        <div className="absolute inset-0 backdrop-blur-sm"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: "url('/api/placeholder/1920/400')"
          }}
        ></div>
        
        {/* Modern Floating Buttons */}
        <div className="absolute top-6 right-6 flex gap-3">
          <button
            onClick={handleUpdateProfile}
            className="bg-white/1 backdrop-blur-md hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 border border-white/30 shadow-lg"
          >
            <Settings className="w-5 h-5" />
          </button>
          <button className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 border border-white/30 shadow-lg">
            <Heart className="w-5 h-5" />
          </button>
        </div>

        {/* Platform Badge */}
        <div className="absolute top-6 left-6">
          <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">
            <span className="text-white font-semibold flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Shoishob Platform
            </span>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="relative -mt-32 z-10 max-w-7xl mx-auto px-4 pb-12">
        {/* Main Profile Card */}
        <div className="bg-white/1 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Profile Header */}
          <div className="relative p-8 pb-6">
            <div className="flex flex-col lg:flex-row items-center lg:items-end gap-6">
              {/* Avatar with Status */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative">
                  <img
                    src={user?.photoURL || "/api/placeholder/150/150"}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-white/30 shadow-lg object-cover bg-white/10"
                  />
                  <div className="absolute bottom-3 right-3 w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
                  <button className="absolute bottom-2 right-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                  <h1 className="text-3xl lg:text-4xl font-bold text-white">
                    {profileData?.name}
                  </h1>
                  <CheckCircle className="w-6 h-6 text-blue-400" />
                </div>
                <p className="text-blue-300 text-lg font-medium mb-2">
                  {profileData?.title}
                </p>
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300 text-sm">Member since {profileData?.joinDate}</span>
                </div>
                
                {/* Quick Info with Modern Icons */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-gray-300 text-sm">
                  <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    {profileData?.location}
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                    <Briefcase className="w-4 h-4 text-blue-400" />
                    {profileData?.company}
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                    <GraduationCap className="w-4 h-4 text-purple-400" />
                    {profileData?.education}
                  </div>
                </div>
              </div>

              {/* Modern Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleUpdateProfile}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Edit3 className="w-4 h-4" />
                  Update Profile
                </button>
                <button className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 border border-white/30">
                  <Mail className="w-4 h-4" />
                  Connect
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Stats Section */}
          <div className="px-8 py-6 border-t border-white/20">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              Statistics
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(profileData?.stats || {}).map(([key, value], index) => (
                <div key={key} className="text-center bg-white/10 rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-200">
                  <div className="text-2xl font-bold text-white mb-1">{value}</div>
                  <div className="text-gray-300 text-sm capitalize">{key}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Modern Achievements */}
          <div className="px-8 py-6 border-t border-white/20">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              Achievements
            </h3>
            <div className="flex flex-wrap gap-4">
              {profileData?.achievements?.map((achievement, index) => {
                const IconComponent = achievement.icon;
                return (
                  <div key={index} className="flex items-center gap-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/20 hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-200">
                    <IconComponent className="w-5 h-5 text-blue-300" />
                    <span className="text-white text-sm font-medium">{achievement.title}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Enhanced Skills */}
          <div className="px-8 py-6 border-t border-white/20">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              Skills & Expertise
            </h3>
            <div className="flex flex-wrap gap-3">
              {profileData?.skills?.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 px-4 py-2 rounded-full text-sm font-medium border border-cyan-500/30 hover:from-cyan-500/30 hover:to-blue-500/30 transition-all duration-200 cursor-pointer"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Enhanced Bio Section */}
          <div className="px-8 py-6 border-t border-white/20">
            <h3 className="text-lg font-semibold text-white mb-4">About Me</h3>
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <p className="text-gray-300 leading-relaxed">
                {profileData?.bio}
                {showMore && (
                  <span className="text-gray-300">
                    {profileData?.extendedBio}
                  </span>
                )}
              </p>
              <button
                onClick={handleSeeMoreClick}
                className="text-blue-400 hover:text-blue-300 font-medium mt-4 transition-colors duration-200 flex items-center gap-1"
              >
                {showMore ? "Show less" : "Show more"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Modern Contact Section */}
          <div className="px-8 py-6 border-t border-white/20 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
            <div className="flex flex-wrap gap-6 justify-center">
              <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-full border border-white/20">
                <Mail className="w-4 h-4 text-blue-400" />
                <span className="text-white text-sm">{user?.email}</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-full border border-white/20">
                <Phone className="w-4 h-4 text-blue-400" />
                <span className="text-white text-sm">+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-lg z-50 flex items-center justify-center p-4">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full border border-white/20 shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Edit3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Update Profile</h3>
              <p className="text-gray-300">Enhance your Shoishob profile to connect better with the community.</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-white/20 hover:bg-white/30 text-white py-3 px-4 rounded-xl transition-all duration-200 font-medium border border-white/30"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 px-4 rounded-xl transition-all duration-200 font-medium shadow-lg"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;