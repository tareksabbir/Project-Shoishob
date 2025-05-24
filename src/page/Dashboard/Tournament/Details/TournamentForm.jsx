/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import axios from "axios";
import { AuthContext } from "../../../../Context/AuthProvider";
import Loading from "../../../Loading/Loading";
import {
  Upload,
  MapPin,
  DollarSign,
  Users,
  FileText,
  Image,
  Mail,
  User,
  Phone,
  Building,
  RefreshCw,
  Trophy,
  Calendar,
  Clock,
} from "lucide-react";

const img_hosting_token = import.meta.env.VITE_IMAGE_UPLOAD_TOKEN;
const backendURL = import.meta.env.VITE_BACKEND_URL;

const TournamentForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { user, loading } = useContext(AuthContext);
  const [uploadProgress, setUploadProgress] = useState({
    logo: false,
    cover: false,
  });

  const { data: owner } = useQuery(["owner", user?.email], async () => {
    const res = await axios.get(
      `${backendURL}/api/v1/user/email/${user?.email}`
    );
    return res.data.data;
  });

  const { data: turf = [], isLoading } = useQuery(
    ["turf", owner?.email],
    async () => {
      if (!owner?.email) return [];
      const res = await axios.get(
        `${backendURL}/api/v1/turf/details?searchTerm=${owner?.email}`
      );
      return res.data.data;
    },
    { enabled: !!owner?.email }
  );

  const turfData = turf[0];

  if (loading || isLoading) return <Loading />;

  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const uploadImage = async (file, type) => {
    setUploadProgress((prev) => ({ ...prev, [type]: true }));
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(img_hosting_url, formData);
      return res.data.data.display_url;
    } finally {
      setUploadProgress((prev) => ({ ...prev, [type]: false }));
    }
  };

  const handleForm = async (data) => {
    try {
      Swal.fire({
        title: "Uploading...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const logoUrl = await uploadImage(data.logo[0], "logo");
      const coverUrl = await uploadImage(data.cover[0], "cover");

      const tournamentData = {
        turf_name: data.turf_name,
        email: data.email,
        turf_id: data.turf_id,
        ownerPhone: data.ownerPhone,
        tournament_name: data.tournament_name,
        registration_start: data.registration_start,
        registration_end: data.registration_end,
        address: data.address,
        city: data.city,
        price: data.price,
        logo: logoUrl,
        cover: coverUrl,
        about: data.about,
        rules: data.rules,
        person: data.person,
      };

      const res = await axios.post(
        `${backendURL}/api/v1/tournament-details/post-Tournament-data`,
        tournamentData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data) {
        reset();
        Swal.fire({
          title: "Success",
          text: "Tournament created successfully!",
          icon: "success",
          background: "#1e293b", // Dark slate background
          color: "#f1f5f9", // Light text
          confirmButtonColor: "#5ac5a6", // Teal-green confirm button
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Failed to save tournament",
          icon: "error",
          background: "#1e293b", // Dark slate background
          color: "#f1f5f9", // Light text
          confirmButtonColor: "#ef4444", // Red confirm button
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error?.message || "Something went wrong",
        icon: "error",
        background: "#1e293b",
        color: "#f1f5f9",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  const inputClasses =
    "w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 text-white placeholder-gray-400 hover:border-gray-500";
  const labelClasses = "block text-sm font-medium text-gray-300 mb-2";

  return (
    <div className="min-h-screen bg-gray-900 px-4">
      <div className="px-10 mx-auto">
        <div className="bg-gray-900 px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Tournament Registration
              </h1>
              <p className="text-gray-400 mt-2">
                Create and manage your tournament events with ease.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-gray-700 rounded-lg px-4 py-2 border border-gray-600">
                <span className="text-gray-300 text-sm">
                  Last updated: Just now
                </span>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-700/50 overflow-hidden">
          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-600/10 p-1 rounded-3xl">
            <div className="bg-gray-900 rounded-3xl p-8">
              <form onSubmit={handleSubmit(handleForm)} className="space-y-10">
                {/* Tournament Information */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="p-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                      Tournament Information
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClasses}>Tournament Name *</label>
                      <input
                        type="text"
                        className={inputClasses}
                        placeholder="Enter tournament name"
                        {...register("tournament_name", { required: true })}
                      />
                    </div>

                    <div>
                      <label className={labelClasses}>
                        <DollarSign className="inline w-4 h-4 mr-2" />
                        Entry Fee (BDT) *
                      </label>
                      <input
                        type="text"
                        className={inputClasses}
                        placeholder="3500"
                        defaultValue={3500}
                        {...register("price", { required: true })}
                      />
                    </div>

                    <div>
                      <label className={labelClasses}>
                        <Calendar className="inline w-4 h-4 mr-2" />
                        Registration Start *
                      </label>
                      <input
                        type="date"
                        className={inputClasses}
                        {...register("registration_start", { required: true })}
                      />
                    </div>

                    <div>
                      <label className={labelClasses}>
                        <Clock className="inline w-4 h-4 mr-2" />
                        Registration End *
                      </label>
                      <input
                        type="date"
                        className={inputClasses}
                        {...register("registration_end", { required: true })}
                      />
                    </div>

                    <div>
                      <label className={labelClasses}>
                        <Users className="inline w-4 h-4 mr-2" />
                        Max Persons per Team *
                      </label>
                      <input
                        type="text"
                        className={inputClasses}
                        placeholder="7"
                        defaultValue={7}
                        {...register("person", { required: true })}
                      />
                    </div>
                  </div>
                </div>

                {/* Turf Information */}
                <div className="space-y-6 border-t border-gray-700 pt-10">
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="p-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg">
                      <Building className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                      Turf Information
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClasses}>Turf Name *</label>
                      <input
                        type="text"
                        className={inputClasses}
                        placeholder="Turf Name"
                        value={turfData?.turf_name || ""}
                        {...register("turf_name", { required: true })}
                      />
                    </div>

                    <div>
                      <label className={labelClasses}>
                        <Mail className="inline w-4 h-4 mr-2" />
                        Owner Email *
                      </label>
                      <input
                        type="email"
                        className={inputClasses}
                        placeholder="owner@example.com"
                        value={turfData?.email || ""}
                        {...register("email", { required: true })}
                      />
                    </div>

                    <div>
                      <label className={labelClasses}>
                        <User className="inline w-4 h-4 mr-2" />
                        Turf ID *
                      </label>
                      <input
                        type="text"
                        className={inputClasses}
                        placeholder="Turf ID"
                        value={turfData?.id || ""}
                        {...register("turf_id", { required: true })}
                      />
                    </div>

                    <div>
                      <label className={labelClasses}>
                        <Phone className="inline w-4 h-4 mr-2" />
                        Owner Phone *
                      </label>
                      <input
                        type="text"
                        className={inputClasses}
                        placeholder="Owner phone Number"
                        defaultValue={turfData?.ownerPhone}
                        {...register("ownerPhone", { required: true })}
                      />
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-6 border-t border-gray-700 pt-10">
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="p-2 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                      Location Details
                    </h2>
                  </div>

                  <div>
                    <label className={labelClasses}>Full Address *</label>
                    <input
                      type="text"
                      className={inputClasses}
                      placeholder="Turf Address"
                      defaultValue={turfData?.address}
                      {...register("address", { required: true })}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClasses}>City *</label>
                      <input
                        type="text"
                        className={inputClasses}
                        placeholder="City"
                        defaultValue="chittagong"
                        {...register("city", { required: true })}
                      />
                    </div>
                  </div>
                </div>

                {/* Images */}
                <div className="space-y-6 border-t border-gray-700 pt-10">
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="p-2 bg-gradient-to-r from-pink-500 to-rose-600 rounded-lg">
                      <Image className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                      Tournament Images
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClasses}>Tournament Logo *</label>
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          className="w-full px-4 py-6 border-2 border-dashed border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-500/20 file:text-cyan-400 hover:file:bg-cyan-500/30 bg-gray-800/50 text-gray-300"
                          {...register("logo", { required: true })}
                        />
                        {uploadProgress.logo && (
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                            <div className="animate-spin rounded-full h-6 w-6 border-2 border-cyan-500 border-t-transparent"></div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className={labelClasses}>Cover Photo *</label>
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          className="w-full px-4 py-6 border-2 border-dashed border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-500/20 file:text-cyan-400 hover:file:bg-cyan-500/30 bg-gray-800/50 text-gray-300"
                          {...register("cover", { required: true })}
                        />
                        {uploadProgress.cover && (
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                            <div className="animate-spin rounded-full h-6 w-6 border-2 border-cyan-500 border-t-transparent"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-6 border-t border-gray-700 pt-10">
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                      Tournament Details
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className={labelClasses}>
                        Tournament Details *
                      </label>
                      <textarea
                        rows="4"
                        className={inputClasses + " resize-none"}
                        placeholder="About Tournament Details in 100 Words"
                        {...register("about", { required: true })}
                      ></textarea>
                    </div>

                    <div>
                      <label className={labelClasses}>Tournament Rules *</label>
                      <textarea
                        rows="4"
                        className={inputClasses + " resize-none"}
                        placeholder="About Tournament Rules in 100 Words"
                        {...register("rules", { required: true })}
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="border-t border-gray-700 pt-10">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25 flex items-center justify-center space-x-3 text-lg"
                  >
                    <Trophy className="w-6 h-6" />
                    <span>Create Tournament</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentForm;
