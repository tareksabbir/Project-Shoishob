import axios from "axios";
import { useState } from "react";

const RegistrationForm = () => {
  // Mock backend URL for demonstration
  const backendURL = "https://api.example.com";

  const [formData, setFormData] = useState({
    team_name: "",
    captain_name: "",
    email: "user@example.com",
    player_Phone_one: "",
    address: "",
    city: "Chittagong",
    price: "3500",
    person: "7",
    player_2_email: "",
    player_3_email: "",
    player_4_email: "",
    player_5_email: "",
    player_6_email: "",
    player_7_email: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Mock data for demonstration
  const userData = { email: "user@example.com" };
  const tournamentId = "tournament-123";

  const validateForm = () => {
    const requiredFields = [
      'team_name',
      'captain_name', 
      'player_Phone_one',
      'address',
      'city',
      'player_2_email',
      'player_3_email',
      'player_4_email',
      'player_5_email',
      'player_6_email',
      'player_7_email'
    ];

    for (const field of requiredFields) {
      if (!formData[field] || formData[field].trim() === "") {
        return false;
      }
    }

    // Validate email formats
    const emailFields = [
      'player_2_email',
      'player_3_email', 
      'player_4_email',
      'player_5_email',
      'player_6_email',
      'player_7_email'
    ];

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    for (const field of emailFields) {
      if (!emailRegex.test(formData[field])) {
        return false;
      }
    }

    return true;
  };

  const handleForm = async () => {
    setError("");
    
    if (!validateForm()) {
      setError("Please fill in all required fields with valid information.");
      return;
    }

    const registrationDataUpdate = {
      ...formData,
      tournamentId: tournamentId,
    };

    setLoading(true);

    try {
      const res = await axios.post(
        `${backendURL}/api/v1/tournamentRegistration`,
        registrationDataUpdate,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );

      window.location.replace(res.data.url);
    } catch (error) {
      console.error(error);
      // No state to set error, just log it
    }

    // try {
    //   // Mock API call - replace with actual API endpoint
    //   const response = await fetch(`${backendURL}/api/v1/tournamentRegistration`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(registrationDataUpdate),
    //   });

    //   if (!response.ok) {
    //     throw new Error('Registration failed');
    //   }

    //   const data = await response.json();
      
    //   // For demo purposes, show success message instead of redirect
    //   alert("Registration submitted successfully! Redirecting to payment...");
      
    //   // In real implementation, uncomment this:
    //   // window.location.replace(data.url);
      
    // } catch (error) {
    //   console.error("Registration error:", error);
    //   setError("Registration failed. Please try again.");
    // } finally {
    //   setLoading(false);
    // }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Processing your registration...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0"></div>

        {/* Floating orbs with better animations */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-violet-500/10 to-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>

        {/* Additional floating elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-2xl animate-bounce delay-300"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-r from-rose-500/10 to-orange-500/10 rounded-full blur-2xl animate-bounce delay-700"></div>
      </div>

      <div className="relative z-10 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Header Section */}
          <div className="text-center mb-16">
            <div className="relative inline-flex items-center justify-center mb-8">
              <div className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <div className="relative w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>

            <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-6 tracking-tight">
              Tournament Registration
            </h1>
            <p className="text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed mb-4">
              Join the ultimate gaming tournament experience. Register your team
              and compete for glory.
            </p>
            <p className="text-rose-400 font-semibold text-lg">
              Please fill out all required sections before submitting
            </p>

            {/* Progress indicator */}
            <div className="flex items-center justify-center mt-8 space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"></div>
                <div className="w-16 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 ml-2"></div>
              </div>
              <span className="text-slate-400 text-sm">Step 1 of 2</span>
              <div className="flex items-center">
                <div className="w-16 h-0.5 bg-slate-600 mr-2"></div>
                <div className="w-3 h-3 bg-slate-600 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-8 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400 text-center">
              {error}
            </div>
          )}

          {/* Enhanced Registration Form Card */}
          <div className="relative">
            {/* Card glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-3xl blur-2xl"></div>

            <div className="relative bg-slate-800/40 backdrop-blur-2xl border border-slate-700/50 rounded-3xl shadow-2xl overflow-hidden">
              {/* Card header with gradient */}
              <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 p-8 border-b border-slate-700/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">
                      Team Registration
                    </h2>
                    <p className="text-slate-400">
                      Complete your tournament registration form
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 text-green-400">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    <span className="text-sm font-medium">
                      Secure Registration
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-8 lg:p-12 space-y-12">
                {/* Team Information Section */}
                <div className="space-y-8">
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        Team Information
                      </h3>
                      <p className="text-slate-400">
                        Basic team and captain details
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-slate-300 uppercase tracking-wider">
                        Team Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        className="w-full px-6 py-4 bg-slate-700/30 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 backdrop-blur-sm hover:bg-slate-700/40"
                        value={formData.team_name}
                        onChange={(e) =>
                          handleInputChange("team_name", e.target.value)
                        }
                        placeholder="Enter your team name"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-slate-300 uppercase tracking-wider">
                        Captain Email <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="email"
                        className="w-full px-6 py-4 bg-slate-700/30 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 backdrop-blur-sm"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        placeholder="captain@example.com"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-slate-300 uppercase tracking-wider">
                        Captain Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        className="w-full px-6 py-4 bg-slate-700/30 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 backdrop-blur-sm hover:bg-slate-700/40"
                        value={formData.captain_name}
                        onChange={(e) =>
                          handleInputChange("captain_name", e.target.value)
                        }
                        placeholder="Enter captain's full name"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-slate-300 uppercase tracking-wider">
                        Captain Phone <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        className="w-full px-6 py-4 bg-slate-700/30 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 backdrop-blur-sm hover:bg-slate-700/40"
                        value={formData.player_Phone_one}
                        onChange={(e) =>
                          handleInputChange("player_Phone_one", e.target.value)
                        }
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>
                </div>

                {/* Enhanced Divider */}
                <div className="relative flex items-center justify-center py-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-600"></div>
                  </div>
                  <div className="relative bg-slate-800 px-6 py-2 rounded-full">
                    <div className="flex items-center space-x-2 text-slate-400">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="text-sm font-medium">
                        Contact Information
                      </span>
                    </div>
                  </div>
                </div>

                {/* Contact Information Section */}
                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-slate-300 uppercase tracking-wider">
                      Address <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-6 py-4 bg-slate-700/30 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 backdrop-blur-sm hover:bg-slate-700/40"
                      value={formData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      placeholder="Enter your complete address"
                    />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-slate-300 uppercase tracking-wider">
                        City <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        className="w-full px-6 py-4 bg-slate-700/30 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 backdrop-blur-sm hover:bg-slate-700/40"
                        value={formData.city}
                        onChange={(e) =>
                          handleInputChange("city", e.target.value)
                        }
                        placeholder="City"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-slate-300 uppercase tracking-wider">
                        Registration Fee (Taka)
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-400 font-bold text-lg">
                          ৳
                        </span>
                        <input
                          type="text"
                          className="w-full pl-10 pr-6 py-4 bg-slate-700/30 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 backdrop-blur-sm font-mono text-lg font-semibold"
                          value={formData.price}
                          onChange={(e) =>
                            handleInputChange("price", e.target.value)
                          }
                          placeholder="Price"
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-slate-300 uppercase tracking-wider">
                        Team Size
                      </label>
                      <input
                        type="text"
                        className="w-full px-6 py-4 bg-slate-700/30 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 backdrop-blur-sm font-mono text-lg font-semibold"
                        value={formData.person}
                        onChange={(e) =>
                          handleInputChange("person", e.target.value)
                        }
                        placeholder="Number of players"
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                {/* Enhanced Divider */}
                <div className="relative flex items-center justify-center py-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-600"></div>
                  </div>
                  <div className="relative bg-slate-800 px-6 py-2 rounded-full">
                    <div className="flex items-center space-x-2 text-slate-400">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <span className="text-sm font-medium">
                        Team Players (6 Additional Players)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Team Players Section */}
                <div className="space-y-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {[2, 3, 4, 5, 6, 7].map((playerNumber) => (
                      <div key={playerNumber} className="space-y-3">
                        <label className="block text-sm font-semibold text-slate-300 uppercase tracking-wider">
                          Player{" "}
                          {playerNumber === 2
                            ? "II"
                            : playerNumber === 3
                            ? "III"
                            : playerNumber === 4
                            ? "IV"
                            : playerNumber === 5
                            ? "V"
                            : playerNumber === 6
                            ? "VI"
                            : "VII"}{" "}
                          Email <span className="text-rose-400">*</span>
                        </label>
                        <div className="relative">
                          <svg
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                            />
                          </svg>
                          <input
                            type="email"
                            className="w-full pl-12 pr-6 py-4 bg-slate-700/30 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 backdrop-blur-sm hover:bg-slate-700/40"
                            value={formData[`player_${playerNumber}_email`]}
                            onChange={(e) =>
                              handleInputChange(
                                `player_${playerNumber}_email`,
                                e.target.value
                              )
                            }
                            placeholder={`Enter Player ${
                              playerNumber === 2
                                ? "II"
                                : playerNumber === 3
                                ? "III"
                                : playerNumber === 4
                                ? "IV"
                                : playerNumber === 5
                                ? "V"
                                : playerNumber === 6
                                ? "VI"
                                : "VII"
                            } email address`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Enhanced Registration Button */}
                <div className="pt-12">
                  <button
                    type="button"
                    onClick={handleForm}
                    disabled={loading}
                    className="w-full relative overflow-hidden bg-gradient-to-r from-purple-600 via-purple-600 to-cyan-600 hover:from-purple-700 hover:via-purple-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-6 px-8 rounded-2xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/50 group"
                  >
                    {/* Button shine effect */}
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                    <span className="relative z-10 flex items-center justify-center space-x-4">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                      <span className="text-xl">
                        {loading ? "Processing..." : "Complete Registration & Make Payment"}
                      </span>
                      {!loading && (
                        <svg
                          className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      )}
                    </span>
                  </button>

                  <div className="flex items-center justify-center mt-6 text-slate-400">
                    <div className="flex items-center space-x-2 bg-slate-800/50 px-4 py-2 rounded-full">
                      <svg
                        className="w-4 h-4 text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                      <span className="text-sm font-medium">
                        Secure Registration Process
                      </span>
                    </div>
                  </div>

                  <p className="text-center text-slate-500 text-sm mt-4">
                    By registering, you agree to our terms and conditions.
                    Registration fee is non-refundable.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RegistrationForm;