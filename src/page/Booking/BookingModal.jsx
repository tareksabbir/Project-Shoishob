/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import { format } from "date-fns";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const BookingModal = ({ booking, selectedDate, setBooking, refetch }) => {
  const { turf_name, address, slots, logo, price, ownerId } = booking;
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [formData, setFormData] = useState({
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState({});

  const date = format(selectedDate, "PP");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
  // Format price as currency
  const formatPrice = (price) => {
    const numPrice = typeof price === "string" ? parseFloat(price) : price;
    return isNaN(numPrice) ? "৳ 0" : `৳ ${numPrice}`;
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};

    const cleanPhone = formData.phone.replace(/\D/g, ""); // Remove non-digits
    if (
      !formData.phone ||
      cleanPhone.length !== 11 ||
      !cleanPhone.startsWith("01")
    ) {
      newErrors.phone =
        "Please enter a valid BD phone number (11 digits starting with 01)";
    }

    if (!selectedSlot) {
      newErrors.slot = "Please select a time slot";
    }

    if (!formData.address || formData.address.trim().length < 10) {
      newErrors.address = "Please provide a complete address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleBooking = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    const bookingData = {
      turf: turf_name,
      name: user?.displayName,
      email: user?.email,
      slot: selectedSlot,
      phone: formData.phone,
      address: formData.address,
      price: price,
      photo: logo,
      ownerId,
      paid: false,
      selectedDate: date,
    };

    try {
      const response = await fetch(`${API_URL}/api/v1/bookings`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const id = data.data?._id;

      if (data.success && id) {
        setBooking(null);

        Swal.fire({
          title: "🎉 Booking Confirmed!",
          text: "Your slot has been reserved successfully!",
          icon: "success",
          confirmButtonColor: "#10b981",
          cancelButtonColor: "#ef4444",
          showCancelButton: true,
          confirmButtonText: "💳 Pay Now",
          cancelButtonText: "⏰ Pay Later",
          reverseButtons: true,
          background: "#1e293b",
          color: "#ffffff",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate(`/dashboard/payment/${id}`);
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
              title: "⚠️ Payment Reminder",
              text: "Please complete payment within 60 minutes to secure your booking!",
              icon: "warning",
              background: "#1e293b",
              color: "#ffffff",
              timer: 5000,
              timerProgressBar: true,
            });
          }
        });

        if (refetch) refetch();
      } else {
        throw new Error(data.message || "Booking failed");
      }
    } catch (error) {
      console.error("Booking error:", error);
      Swal.fire({
        title: "❌ Booking Failed",
        text: "You can not book a turf more than once in a day. Please try again tomorrow.",
        icon: "error",
        background: "#1e293b",
        color: "#ffffff",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setBooking(null);
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4  mt-5 md:mt-14">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm transition-opacity duration-300"
        onClick={handleClose}
        aria-label="Close modal"
      />

      {/* Modal Container */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-purple-900/50 backdrop-blur-xl border border-slate-600/30 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-100 opacity-100">
        {/* Animated Background Effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -inset-10 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-cyan-500/30 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute -inset-5 bg-gradient-to-l from-pink-500/20 via-indigo-500/20 to-blue-500/20 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 overflow-y-auto max-h-[90vh]">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-purple-900/95 backdrop-blur-sm border-b border-slate-600/30 p-6">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-red-500/20 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-90 focus:outline-none focus:ring-2 focus:ring-red-500/50"
              aria-label="Close modal"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Header Content */}
            <div className="text-center pr-12">
              {/* Logo */}
              <div className="relative inline-block mb-4 group">
                <div className="absolute -inset-3 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
                <div className="relative w-20 h-20 mx-auto rounded-2xl p-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 shadow-2xl transform group-hover:scale-105 transition-transform duration-300">
                  <img
                    alt={`${turf_name} logo`}
                    className="w-full h-full object-cover rounded-xl bg-slate-700"
                    src={logo}
                    onError={(e) => {
                      e.target.src =
                        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iMTYiIGZpbGw9IiM0NzUyNjkiLz4KPHN2ZyB4PSIxNiIgeT0iMTYiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMS41Ij4KPHBhdGggZD0iTTIxIDE2VjhhMiAyIDAgMCAwLTEtMS43MzRsLTctNGEyIDIgMCAwIDAtMiAwbC03IDRBMiAyIDAgMCAwIDMgOHY4YTIgMiAwIDAgMCAxIDEuNzM0bDcgNGEyIDIgMCAwIDAgMiAwbDctNEEyIDIgMCAwIDAgMjEgMTZ6Ii8+CjxwYXRoIGQ9Im0zLjI5IDguMTUgOC4yMiA0LjE3YTEgMSAwIDAgMCAuOTggMGw4LjIyLTQuMTciLz4KPHBhdGggZD0iTTEyIDIuNzZ2OC40NCIvPgo8L3N2Zz4KPC9zdmc+";
                    }}
                  />
                </div>
              </div>

              <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 mb-2">
                Book Your Slot
              </h2>
              <h3 className="text-xl font-bold text-white mb-2">{turf_name}</h3>
              <p className="text-gray-300 text-sm flex items-center justify-center gap-2 max-w-md mx-auto">
                <svg
                  className="w-4 h-4 text-purple-400 flex-shrink-0"
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
                <span className="truncate">{address}</span>
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleBooking} className="p-6 space-y-6">
            {/* User Info Section */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Name Field */}
                <div className="space-y-2">
                  <label className=" text-sm font-semibold text-gray-300 flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-blue-400"
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
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={user?.displayName || ""}
                    disabled
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300"
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className=" text-sm font-semibold text-gray-300 flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Booking Details Section */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Date */}
                <div className="space-y-2">
                  <label className=" text-sm font-semibold text-gray-300 flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-cyan-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a2 2 0 012 2v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2h3z"
                      />
                    </svg>
                    Date
                  </label>
                  <input
                    type="text"
                    value={date}
                    disabled
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                    Price per Hour ৳
                  </label>
                  <input
                    type="text"
                    value={formatPrice(price)}
                    disabled
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white disabled:opacity-60 disabled:cursor-not-allowed font-semibold "
                  />
                </div>
              </div>
            </div>

            {/* Time Slot Selection */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-lg font-semibold text-white flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-orange-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Select Time Slot
                </label>
                {selectedSlot && (
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium">
                    Selected: {selectedSlot}
                  </span>
                )}
              </div>

              {errors.slot && (
                <p className="text-red-400 text-sm flex items-center gap-1">
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
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {errors.slot}
                </p>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3">
                {slots?.map((slot, index) => (
                  <label key={index} className="cursor-pointer group">
                    <input
                      type="radio"
                      name="slot"
                      value={slot}
                      onChange={(e) => setSelectedSlot(e.target.value)}
                      className="sr-only"
                    />
                    <div
                      className={`p-3 border-2 rounded-xl text-center transition-all duration-300 transform hover:scale-105 ${
                        selectedSlot === slot
                          ? "border-blue-500 bg-blue-500/20 text-blue-300 shadow-lg shadow-blue-500/20"
                          : "border-slate-600/50 bg-slate-700/30 text-gray-300 hover:border-slate-500/70 hover:bg-slate-700/50"
                      }`}
                    >
                      <span className="font-semibold text-sm">{slot}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <div className="space-y-4">
                {/* Phone */}
                <div className="space-y-2">
                  <label className=" text-sm font-semibold text-gray-300 flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-pink-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    placeholder="01XXXXXXXXX"
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={`w-full px-4 py-3 bg-slate-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all duration-300 ${
                      errors.phone
                        ? "border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50"
                        : "border-slate-600/50"
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-sm flex items-center gap-1">
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
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <label className=" text-sm font-semibold text-gray-300 flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-indigo-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    Your Complete Address *
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    placeholder="Enter your full address including street, city, state, and zip code"
                    rows={3}
                    className={`w-full px-4 py-3 bg-slate-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300 resize-none ${
                      errors.address
                        ? "border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50"
                        : "border-slate-600/50"
                    }`}
                  />
                  {errors.address && (
                    <p className="text-red-400 text-sm flex items-center gap-1">
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
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {errors.address}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-slate-600/30">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full relative py-4 px-8 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white font-bold text-lg rounded-xl hover:from-blue-500 hover:via-purple-500 hover:to-cyan-500 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transform hover:-translate-y-1 transition-all duration-300 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center space-x-3">
                  {isLoading ? (
                    <>
                      <svg
                        className="w-6 h-6 animate-spin"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      <span>Processing Your Booking...</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      <span>Complete Booking</span>
                      <svg
                        className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </>
                  )}
                </span>

                {/* Button glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl" />
              </button>

              <p className="text-gray-400 text-xs text-center mt-3">
                * Required fields. You'll have 60 minutes to complete payment
                after booking.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
