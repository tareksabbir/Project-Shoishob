/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import {
  Save,
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
} from "lucide-react";

const img_hosting_token = import.meta.env.VITE_IMAGE_UPLOAD_TOKEN;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

const TurfUpdates = () => {
  const [turfDetails, setTurfDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({
    logo: false,
    cover: false,
  });
  const [selectedFiles, setSelectedFiles] = useState({
    logo: null,
    cover: null,
  });
  const { id } = useParams();

  const { register, handleSubmit, setValue, watch } = useForm();

  const showAlert = (title, text, type = "success") => {
    const config = {
      title,
      text,
      icon: type,
      background: "#1f2937",
      color: "#fff",
      confirmButtonColor: type === "success" ? "#059669" : "#dc2626",
    };
    Swal.fire(config);
  };

  const uploadImage = async (imageFile, type) => {
    const formDataUpload = new FormData();
    formDataUpload.append("image", imageFile);

    setUploadProgress((prev) => ({ ...prev, [type]: true }));

    try {
      const response = await fetch(img_hosting_url, {
        method: "POST",
        body: formDataUpload,
      });

      if (!response.ok) {
        throw new Error(`Failed to upload ${type} image`);
      }

      const data = await response.json();
      return data.data.display_url;
    } catch (error) {
      console.error(`Error uploading ${type} image:`, error);
      throw error;
    } finally {
      setUploadProgress((prev) => ({ ...prev, [type]: false }));
    }
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    setSelectedFiles((prev) => ({ ...prev, [type]: file }));
  };

  const handleForm = async (data) => {
    setSubmitting(true);
    try {
      let logoUrl = turfDetails.logo;
      let coverUrl = turfDetails.cover;

      // Upload logo image if new file is selected
      if (selectedFiles.logo) {
        logoUrl = await uploadImage(selectedFiles.logo, "logo");
      }

      // Upload cover image if new file is selected
      if (selectedFiles.cover) {
        coverUrl = await uploadImage(selectedFiles.cover, "cover");
      }

      // Create turf object
      const saveTurf = {
        turf_name: data.turf_name,
        email: data.email,
        ownerId: data.ownerId,
        ownerPhone: data.ownerPhone,
        address: data.address,
        city: data.city,
        price: parseFloat(data.price),
        person: parseInt(data.person),
        logo: logoUrl,
        cover: coverUrl,
        about: data.about,
        rules: data.rules,
      };

      // Send PATCH request to update turf
      const response = await axios.patch(
        `${BACKEND_URL}/api/v1/turf/${id}`,
        saveTurf,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (response.data) {
        showAlert("Success!", "Turf updated successfully", "success");
      }
    } catch (error) {
      console.error("Error updating turf:", error);
      showAlert(
        "Error!",
        "Something went wrong while updating the turf",
        "error"
      );
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchTurfDetails = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/turf/${id}`, {
          headers: {
            authorization: `bearer ${localStorage.getItem("access_token")}`,
          },
        });
        const data = response.data.data;
        setTurfDetails(data);

        // Set form values
        setValue("turf_name", data.turf_name || "");
        setValue("email", data.email || "");
        setValue(
          "ownerId",
          typeof data.ownerId === "object"
            ? data.ownerId._id
            : data.ownerId || ""
        );
        setValue("ownerPhone", data.ownerPhone || "");
        setValue("address", data.address || "");
        setValue("city", data.city || "");
        setValue("price", data.price || "");
        setValue("person", data.person || "");
        setValue("about", data.about || "");
        setValue("rules", data.rules || "");

        setLoading(false);
      } catch (error) {
        console.error("Error fetching turf details:", error);
        setLoading(false);
        showAlert("Error!", "Failed to load turf details", "error");
      }
    };

    fetchTurfDetails();
  }, [id, setValue]);

  const inputClasses =
    "w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 text-white placeholder-gray-400 hover:border-gray-500";
  const labelClasses = "block text-sm font-medium text-gray-300 mb-2";

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-cyan-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">Loading turf details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 py-12 px-4">
      <div className="px-10 mx-auto">
        {/* Header */}
        <div className="bg-gray-900  px-6 py-6 ">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Update Turf Details
              </h1>
              <p className="text-gray-400 mt-2">
                Welcome back! Here's what's happening with your turf business.
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
                {/* Basic Information */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="p-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg">
                      <Building className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                      Basic Information
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClasses}>Turf Name *</label>
                      <input
                        type="text"
                        {...register("turf_name", {
                          required: "Turf name is required",
                        })}
                        className={inputClasses}
                        placeholder="Enter turf name"
                      />
                    </div>

                    <div>
                      <label className={labelClasses}>
                        <Mail className="inline w-4 h-4 mr-2" />
                        Owner Email *
                      </label>
                      <input
                        type="email"
                        {...register("email", {
                          required: "Email is required",
                        })}
                        className={inputClasses}
                        placeholder="owner@example.com"
                      />
                    </div>

                    <div>
                      <label className={labelClasses}>
                        <User className="inline w-4 h-4 mr-2" />
                        Owner ID *
                      </label>
                      <input
                        type="text"
                        {...register("ownerId", {
                          required: "Owner ID is required",
                        })}
                        className={inputClasses}
                        placeholder="Enter owner ID"
                      />
                    </div>

                    <div>
                      <label className={labelClasses}>
                        <Phone className="inline w-4 h-4 mr-2" />
                        Owner Phone *
                      </label>
                      <input
                        type="tel"
                        {...register("ownerPhone", {
                          required: "Phone number is required",
                        })}
                        className={inputClasses}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                </div>

                {/* Location & Pricing */}
                <div className="space-y-6 border-t border-gray-700 pt-10">
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="p-2 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                      Location & Pricing
                    </h2>
                  </div>

                  <div>
                    <label className={labelClasses}>Full Address *</label>
                    <input
                      type="text"
                      {...register("address", {
                        required: "Address is required",
                      })}
                      className={inputClasses}
                      placeholder="Enter complete address"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className={labelClasses}>City *</label>
                      <input
                        type="text"
                        {...register("city", { required: "City is required" })}
                        className={inputClasses}
                        placeholder="Enter city"
                      />
                    </div>

                    <div>
                      <label className={labelClasses}>
                        <DollarSign className="inline w-4 h-4 mr-2" />
                        Price (BDT) *
                      </label>
                      <input
                        type="number"
                        {...register("price", {
                          required: "Price is required",
                        })}
                        className={inputClasses}
                        placeholder="0"
                      />
                    </div>

                    <div>
                      <label className={labelClasses}>
                        <Users className="inline w-4 h-4 mr-2" />
                        Max Persons *
                      </label>
                      <input
                        type="number"
                        {...register("person", {
                          required: "Person count is required",
                        })}
                        className={inputClasses}
                        placeholder="0"
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
                    <h2 className="text-2xl font-bold text-white">Images</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClasses}>Turf Logo</label>
                      <div className="space-y-3">
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, "logo")}
                            className="w-full px-4 py-6 border-2 border-dashed border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-500/20 file:text-cyan-400 hover:file:bg-cyan-500/30 bg-gray-800/50 text-gray-300"
                          />
                          {uploadProgress.logo && (
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                              <div className="animate-spin rounded-full h-6 w-6 border-2 border-cyan-500 border-t-transparent"></div>
                            </div>
                          )}
                        </div>
                        {turfDetails.logo && (
                          <div className="relative inline-block">
                            <img
                              src={turfDetails.logo}
                              alt="Current logo"
                              className="w-20 h-20 object-cover rounded-xl border border-gray-600"
                            />
                            <span className="absolute -top-2 -right-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                              Current
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className={labelClasses}>Cover Photo</label>
                      <div className="space-y-3">
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, "cover")}
                            className="w-full px-4 py-6 border-2 border-dashed border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-500/20 file:text-cyan-400 hover:file:bg-cyan-500/30 bg-gray-800/50 text-gray-300"
                          />
                          {uploadProgress.cover && (
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                              <div className="animate-spin rounded-full h-6 w-6 border-2 border-cyan-500 border-t-transparent"></div>
                            </div>
                          )}
                        </div>
                        {turfDetails.cover && (
                          <div className="relative inline-block">
                            <img
                              src={turfDetails.cover}
                              alt="Current cover"
                              className="w-32 h-20 object-cover rounded-xl border border-gray-600"
                            />
                            <span className="absolute -top-2 -right-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                              Current
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-6 border-t border-gray-700 pt-10">
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="p-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Details</h2>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className={labelClasses}>About Turf *</label>
                      <textarea
                        rows="4"
                        {...register("about", {
                          required: "About section is required",
                        })}
                        className={inputClasses + " resize-none"}
                        placeholder="Describe your turf, facilities, and what makes it special..."
                      ></textarea>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm text-gray-500 ml-auto">
                          {watch("about")?.length || 0}/1000
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className={labelClasses}>Turf Rules *</label>
                      <textarea
                        rows="4"
                        {...register("rules", {
                          required: "Rules section is required",
                        })}
                        className={inputClasses + " resize-none"}
                        placeholder="List the rules and regulations for using this turf..."
                      ></textarea>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm text-gray-500 ml-auto">
                          {watch("rules")?.length || 0}/1000
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="border-t border-gray-700 pt-10">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 disabled:scale-100 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center space-x-3 text-lg"
                  >
                    {submitting ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                        <span>Updating...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-6 h-6" />
                        <span>Update Turf</span>
                      </>
                    )}
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

export default TurfUpdates;
