/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
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
} from "lucide-react";

const AddTurf = () => {
  const [formData, setFormData] = useState({
    turf_name: "",
    email: "",
    ownerId: "",
    ownerPhone: "",
    address: "",
    city: "",
    price: "",
    person: "",
    about: "",
    rules: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({
    logo: false,
    cover: false,
  });
  const [selectedFiles, setSelectedFiles] = useState({
    logo: null,
    cover: null,
  });

  // Mock environment variables - replace with actual values
  const img_hosting_token = import.meta.env.VITE_IMAGE_UPLOAD_TOKEN;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const showAlert = (title, text) => {
    alert(`${title}: ${text}`);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.turf_name.trim())
      newErrors.turf_name = "Turf name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+$/i.test(formData.email))
      newErrors.email = "Invalid email address";
    if (!formData.ownerId.trim()) newErrors.ownerId = "Owner ID is required";
    if (!formData.ownerPhone.trim())
      newErrors.ownerPhone = "Phone number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.price.trim()) newErrors.price = "Price is required";
    else if (parseFloat(formData.price) < 0)
      newErrors.price = "Price must be positive";
    if (!formData.person.trim()) newErrors.person = "Person count is required";
    else if (parseInt(formData.person) < 1)
      newErrors.person = "Must allow at least 1 person";
    if (!formData.about.trim()) newErrors.about = "About section is required";
    else if (formData.about.length > 500)
      newErrors.about = "Maximum 500 characters allowed";
    if (!formData.rules.trim()) newErrors.rules = "Rules section is required";
    else if (formData.rules.length > 500)
      newErrors.rules = "Maximum 500 characters allowed";
    if (!selectedFiles.logo) newErrors.logo = "Logo is required";
    if (!selectedFiles.cover) newErrors.cover = "Cover photo is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    setSelectedFiles((prev) => ({ ...prev, [type]: file }));
    // Clear error when file is selected
    if (errors[type]) {
      setErrors((prev) => ({ ...prev, [type]: "" }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Upload images concurrently
      const [logoUrl, coverUrl] = await Promise.all([
        uploadImage(selectedFiles.logo, "logo"),
        uploadImage(selectedFiles.cover, "cover"),
      ]);

      // Prepare turf data
      const saveTurf = {
        turf_name: formData.turf_name,
        email: formData.email,
        ownerId: formData.ownerId,
        ownerPhone: formData.ownerPhone,
        address: formData.address,
        city: formData.city,
        price: parseFloat(formData.price),
        person: parseInt(formData.person),
        logo: logoUrl,
        cover: coverUrl,
        about: formData.about,
        rules: formData.rules,
      };

      // Save turf data
      const response = await fetch(`${backendUrl}/api/v1/turf/post-turf-data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(saveTurf),
      });

      if (!response.ok) {
        throw new Error("Failed to save turf data");
      }

      const result = await response.json();

      if (result) {
        setFormData({
          turf_name: "",
          email: "",
          ownerId: "",
          ownerPhone: "",
          address: "",
          city: "",
          price: "",
          person: "",
          about: "",
          rules: "",
        });
        setSelectedFiles({ logo: null, cover: null });
        showAlert(
          "Success!",
          "Turf data has been saved successfully",
          "success"
        );
      }
    } catch (error) {
      console.error("Error in form submission:", error);
      showAlert(
        "Error!",
        "Failed to save turf data. Please try again.",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses =
    "w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 text-white placeholder-gray-400 hover:border-gray-500";
  const labelClasses = "block text-sm font-medium text-gray-300 mb-2";
  const errorClasses = "mt-1 text-sm text-red-400";

  return (
    <div className="min-h-screen bg-gray-900 px-4">
      <div className=" px-10 mx-auto ">
        <div className="bg-gray-900  px-6 py-6 ">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Add Turf Details
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
              <div className="space-y-10">
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
                        name="turf_name"
                        value={formData.turf_name}
                        onChange={handleInputChange}
                        className={inputClasses}
                        placeholder="Enter turf name"
                      />
                      {errors.turf_name && (
                        <p className={errorClasses}>{errors.turf_name}</p>
                      )}
                    </div>

                    <div>
                      <label className={labelClasses}>
                        <Mail className="inline w-4 h-4 mr-2" />
                        Owner Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={inputClasses}
                        placeholder="owner@example.com"
                      />
                      {errors.email && (
                        <p className={errorClasses}>{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className={labelClasses}>
                        <User className="inline w-4 h-4 mr-2" />
                        Owner ID *
                      </label>
                      <input
                        type="text"
                        name="ownerId"
                        value={formData.ownerId}
                        onChange={handleInputChange}
                        className={inputClasses}
                        placeholder="Enter owner ID"
                      />
                      {errors.ownerId && (
                        <p className={errorClasses}>{errors.ownerId}</p>
                      )}
                    </div>

                    <div>
                      <label className={labelClasses}>
                        <Phone className="inline w-4 h-4 mr-2" />
                        Owner Phone *
                      </label>
                      <input
                        type="tel"
                        name="ownerPhone"
                        value={formData.ownerPhone}
                        onChange={handleInputChange}
                        className={inputClasses}
                        placeholder="+1 (555) 123-4567"
                      />
                      {errors.ownerPhone && (
                        <p className={errorClasses}>{errors.ownerPhone}</p>
                      )}
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
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={inputClasses}
                      placeholder="Enter complete address"
                    />
                    {errors.address && (
                      <p className={errorClasses}>{errors.address}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className={labelClasses}>City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={inputClasses}
                        placeholder="Enter city"
                      />
                      {errors.city && (
                        <p className={errorClasses}>{errors.city}</p>
                      )}
                    </div>

                    <div>
                      <label className={labelClasses}>
                        <DollarSign className="inline w-4 h-4 mr-2" />
                        Price (BDT) *
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className={inputClasses}
                        placeholder="0"
                      />
                      {errors.price && (
                        <p className={errorClasses}>{errors.price}</p>
                      )}
                    </div>

                    <div>
                      <label className={labelClasses}>
                        <Users className="inline w-4 h-4 mr-2" />
                        Max Persons *
                      </label>
                      <input
                        type="number"
                        name="person"
                        value={formData.person}
                        onChange={handleInputChange}
                        className={inputClasses}
                        placeholder="0"
                      />
                      {errors.person && (
                        <p className={errorClasses}>{errors.person}</p>
                      )}
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
                      <label className={labelClasses}>Turf Logo *</label>
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
                      {errors.logo && (
                        <p className={errorClasses}>{errors.logo}</p>
                      )}
                    </div>

                    <div>
                      <label className={labelClasses}>Cover Photo *</label>
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
                      {errors.cover && (
                        <p className={errorClasses}>{errors.cover}</p>
                      )}
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
                        name="about"
                        value={formData.about}
                        onChange={handleInputChange}
                        className={inputClasses + " resize-none"}
                        placeholder="Describe your turf, facilities, and what makes it special..."
                      ></textarea>
                      <div className="flex justify-between items-center mt-1">
                        {errors.about && (
                          <p className={errorClasses}>{errors.about}</p>
                        )}
                        <span className="text-sm text-gray-500 ml-auto">
                          {formData.about.length}/500
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className={labelClasses}>Turf Rules *</label>
                      <textarea
                        rows="4"
                        name="rules"
                        value={formData.rules}
                        onChange={handleInputChange}
                        className={inputClasses + " resize-none"}
                        placeholder="List the rules and regulations for using this turf..."
                      ></textarea>
                      <div className="flex justify-between items-center mt-1">
                        {errors.rules && (
                          <p className={errorClasses}>{errors.rules}</p>
                        )}
                        <span className="text-sm text-gray-500 ml-auto">
                          {formData.rules.length}/500
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="border-t border-gray-700 pt-10">
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 disabled:scale-100 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center space-x-3 text-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-6 h-6" />
                        <span>Add Turf</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTurf;
