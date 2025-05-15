import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../../Context/AuthProvider";
import { useQuery } from "react-query";
import Loading from "../../../Loading/Loading";
import Swal from "sweetalert2";

const img_hosting_token = import.metahttp://localhost:3000.VITE_Image_Upload_token;

const TournamentForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user, loading } = useContext(AuthContext);
  const { data: owner } = useQuery(["owner", user?.email], async () => {
    const res = await fetch(
      `http://localhost:3000/api/v1/user/email/${user?.email}`
    );
    const data = await res.json();
    return data.data;
  });

  const { data: turf = [], isLoading } = useQuery(
    ["turf", owner?.email],
    async () => {
      if (owner) {
        const res = await fetch(
          `http://localhost:3000/api/v1/turf/details?searchTerm=${owner?.email}`
        );
        const data = await res.json();
        return data.data;
      }
      return [];
    }
  );

  const turfData = turf[0];

  console.log(turfData);

  if (loading || isLoading) {
    return <Loading></Loading>;
  }

  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const handleForm = async (data) => {
    console.log(data);

    const logoFormData = new FormData();
    logoFormData.append("image", data.logo[0]);

    const coverFormData = new FormData();
    coverFormData.append("image", data.cover[0]);

    // First, upload the logo image
    fetch(img_hosting_url, {
      method: "POST",
      body: logoFormData,
    })
      .then((res) => res.json())
      .then((logoResponse) => {
        const logoUrl = logoResponse.data.display_url;

        // After logo image upload, upload the cover image
        fetch(img_hosting_url, {
          method: "POST",
          body: coverFormData,
        })
          .then((res) => res.json())
          .then((coverResponse) => {
            const coverUrl = coverResponse.data.display_url;

            // Now, you have both logoUrl and coverUrl
            const saveTurf = {
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
            console.log(saveTurf);
            fetch(
              "http://localhost:3000/api/v1/tournament-details/post-Tournament-data",
              {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify(saveTurf),
              }
            )
              .then((res) => res.json())
              .then((data) => {
                if (data) {
                  reset();
                  Swal.fire("DONE!!", "Data inserted successfully", "success");
                } else {
                  reset();
                }
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
                    <h3 className="text-black font-semibold">Owner</h3>
                    <p className="bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text text-3xl font-bold sm:text-4xl">
                      Tournament <br /> Registration Form
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
                          value={turfData?.turf_name}
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Your Email address*
                        </label>
                        <input
                          type="email"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-slate-200 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          {...register("email", {
                            required: true,
                          })}
                          placeholder="Owner Email address"
                          value={turfData?.email}
                        />
                      </div>
                    </div>

                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Turf Id*
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-slate-200 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          {...register("turf_id", {
                            required: true,
                          })}
                          placeholder="Owner Id"
                          value={turfData?.id}
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Your phone*
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-slate-200 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          {...register("ownerPhone", {
                            required: true,
                          })}
                          placeholder="Owner phone Number"
                          defaultValue={turfData?.ownerPhone}
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
                          defaultValue={turfData?.address}
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
                          defaultValue={"chittagong"}
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
                          defaultValue={3500}
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
                          defaultValue={7}
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Tournament Name*
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-slate-200 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          {...register("tournament_name", {
                            required: true,
                          })}
                          placeholder="Tournament Name"
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Registration Start*
                        </label>
                        <input
                          type="date"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-slate-200 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          {...register("registration_start", {
                            required: true,
                          })}
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Registration End*
                        </label>
                        <input
                          type="date"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-slate-200 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          {...register("registration_end", {
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
                          Tournament Details*
                        </label>
                        <textarea
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-slate-200 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          rows="4"
                          {...register("about", {
                            required: true,
                          })}
                          placeholder="About Tournament Details in 100 Words"
                        ></textarea>
                      </div>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Tournament Rules*
                        </label>
                        <textarea
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-slate-200 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          rows="4"
                          {...register("rules", {
                            required: true,
                          })}
                          placeholder="About Tournament Rules in 100 Words"
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

export default TournamentForm;
