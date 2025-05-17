import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";

const img_hosting_token = import.meta.env.VITE_IMAGE_UPLOAD_TOKEN;

const AddTurf = () => {
  const { register, handleSubmit, reset } = useForm();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const handleForm = async (data) => {
    const logoFormData = new FormData();
    logoFormData.append("image", data.logo[0]);

    const coverFormData = new FormData();
    coverFormData.append("image", data.cover[0]);

    // First, upload the logo image using axios instead of fetch
    axios.post(img_hosting_url, logoFormData)
      .then((logoResponse) => {
        const logoUrl = logoResponse.data.data.display_url;

        // After logo image upload, upload the cover image using axios
        axios.post(img_hosting_url, coverFormData)
          .then((coverResponse) => {
            const coverUrl = coverResponse.data.data.display_url;

            // Now, you have both logoUrl and coverUrl
            const saveTurf = {
              turf_name: data.turf_name,
              email: data.email,
              ownerId: data.ownerId,
              ownerPhone: data.ownerPhone,
              address: data.address,
              city: data.city,
              price: data.price,
              logo: logoUrl,
              cover: coverUrl,
              about: data.about,
              rules: data.rules,
            };

            // Post turf data using axios
            axios.post(`${backendUrl}/api/v1/turf/post-turf-data`, saveTurf, {
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((response) => {
                if (response.data) {
                  reset();
                  Swal.fire("DONE!!", "Data inserted successfully", "success");
                } else {
                  reset();
                }
              })
              .catch((error) => {
                console.error("Error saving turf data:", error);
              });
          })
          .catch((error) => {
            console.error("Error uploading cover image:", error);
          });
      })
      .catch((error) => {
        console.error("Error uploading logo image:", error);
      });
  };

  return (
    <>
      <main className="relative py-10 bg-gray-950 px-10">
        <div className="relative z-10 max-w-screen-xl mx-auto text-gray-600 sm:px-4 md:px-8">
          <div className="mt-12 mx-auto px-4 p-8 sm:px-8 sm:rounded-xl">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6  rounded-lg bg-blueGray-100 border-0 bg-white p-10 shadow-2xl shadow-slate-700">
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={handleSubmit(handleForm)}>
                  <div className="max-w-lg space-y-3 px-4 sm:mx-auto sm:text-center sm:px-0 mb-20">
                    <h3 className="text-black font-semibold">Admin</h3>
                    <p className="bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text text-3xl font-bold sm:text-4xl">
                      Add Turf Details
                    </p>
                    <p className="text-gray-900">
                      Please do not submit with out fill up all the section
                    </p>
                  </div>
                  <div className="flex flex-wrap">
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Turf Name*
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-slate-200 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          {...register("turf_name", {
                            required: true,
                          })}
                          placeholder="Turf Name"
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Owner Email address*
                        </label>
                        <input
                          type="email"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-slate-200 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          {...register("email", {
                            required: true,
                          })}
                          placeholder="Owner Email address"
                        />
                      </div>
                    </div>

                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Owner Id*
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-slate-200 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          {...register("ownerId", {
                            required: true,
                          })}
                          placeholder="Owner Id"
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Owner phone*
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-slate-200 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          {...register("ownerPhone", {
                            required: true,
                          })}
                          placeholder="Owner phone Number"
                        />
                      </div>
                    </div>
                  </div>

                  <hr className="mt-6 border-b-1 border-blueGray-300" />

                  <div className="flex flex-wrap mt-5">
                    <div className="w-full lg:w-12/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Address*
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-slate-200 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          {...register("address", {
                            required: true,
                          })}
                          placeholder="Turf Address"
                        />
                      </div>
                    </div>

                    <div className="w-full lg:w-4/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          City*
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-slate-200 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          {...register("city", {
                            required: true,
                          })}
                          placeholder="City"
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Price*
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-slate-200 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          {...register("price", {
                            required: true,
                          })}
                          placeholder="Price In Taka"
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          person*
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-slate-200 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          {...register("person", {
                            required: true,
                          })}
                          placeholder="Persons"
                        />
                      </div>
                    </div>

                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Turf Logo*
                        </label>
                        <input
                          type="file"
                          className="file-input file-input-bordered w-full max-w-sm bg-slate-200"
                          {...register("logo", {
                            required: true,
                          })}
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Cover Photo*
                        </label>
                        <input
                          type="file"
                          className="file-input file-input-bordered w-full max-w-sm bg-slate-200"
                          {...register("cover", {
                            required: true,
                          })}
                        />
                      </div>
                    </div>
                  </div>

                  <hr className="mt-6 border-b-1 border-blueGray-300" />

                  <div className="flex flex-wrap mt-5">
                    <div className="w-full lg:w-12/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          About Turf Details*
                        </label>
                        <textarea
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-slate-200 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          rows="4"
                          {...register("about", {
                            required: true,
                          })}
                          placeholder="About Turf Details in 100 Words"
                        ></textarea>
                      </div>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          About Turf Rules*
                        </label>
                        <textarea
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-slate-200 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          rows="4"
                          {...register("rules", {
                            required: true,
                          })}
                          placeholder="About Turf Rules in 100 Words"
                        ></textarea>
                        <button className="w-full px-4 py-2 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-lg duration-150 mt-5">
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-0 blur-[118px] max-w-lg h-[800px] mx-auto sm:max-w-3xl sm:h-[400px]"
          style={{
            background:
              "linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)",
          }}
        ></div>
      </main>
    </>
  );
};

export default AddTurf;
