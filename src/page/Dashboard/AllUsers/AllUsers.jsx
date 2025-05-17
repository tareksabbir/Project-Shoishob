/* eslint-disable no-unused-vars */
import { useQuery } from "react-query";
import axios from "axios";
import admin from "../../../assets/icons/star (4).png";
import userIcon from "../../../assets/icons/star (5).png";
import Swal from "sweetalert2";

const AllUsers = () => {
  const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
  
  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await axios.get(`${API_URL}/api/v1/user`, {
      headers: {
        authorization: `bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return res.data.data;
  });

  const handleUserDetails = () => {
    console.log("user profile ");
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You Wanted Delete This User!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#5ac5a6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${API_URL}/api/v1/user/${id}`)
          .then(() => {
            Swal.fire("Done!!", "User Deleted Successfully ", "success");
            refetch();
          });
      }
    });
  };

  const handleMakeAdmin = (user) => {
    const id = user._id;
    Swal.fire({
      title: "Are you sure?",
      text: "You Wanted To Make Him Admin!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#5ac5a6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        const makeAdmin = { role: "admin" };
        axios.patch(`${API_URL}/api/v1/user/${id}`, makeAdmin, {
          headers: {
            "content-type": "application/json",
          },
        })
          .then((res) => {
            Swal.fire("Done!!", "User Become Admin Successfully ", "success");
            refetch();
            saveAdmin(user);
          });
      }
    });
  };

  const saveAdmin = (user) => {
    const saveUserAdmin = {
      name: user.name,
      email: user.email,
      photo: user?.photo,
      id: user._id,
      role: "admin",
    };
    axios.post(`${API_URL}/api/v1/admin/create-admin`, saveUserAdmin, {
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        console.log(`Admin role saved for ${user.name}`);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Admin permissions saved for ${user.name}`,
          showConfirmButton: false,
          timer: 1500
        });
      })
      .catch((error) => {
        console.error("Error saving admin:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to save admin permissions!",
        });
      });
  };

  return (
    <>
      <div className="overflow-x-auto lg:p-20">
        <table className="table bg-slate-950">
          {/* head */}
          <thead>
            <tr>
              <th className=" bg-slate-700 rounded-tl-xl py-4">
                <label>User</label>
              </th>
              <th className=" bg-slate-700 text-slate-300">Name</th>
              <th className=" bg-slate-700 text-slate-300">Email & User Id</th>

              <th className=" bg-slate-700 text-slate-300">Make Admin</th>

              <th className=" bg-slate-700 text-slate-300 ">Details</th>
              <th className=" bg-slate-700 text-slate-300 rounded-tr-xl">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>
                  <label>
                    <p>{index + 1}</p>
                  </label>
                </th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={user.photo}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                      <div className="text-sm opacity-50">Chittagong</div>
                    </div>
                  </div>
                </td>
                <td>
                  {user.email}
                  <br />
                  <span className="badge badge-ghost badge-sm">{user._id}</span>
                </td>

                <td>
                  {user.role === "admin" ? (
                    <>
                      <img src={admin} alt="" className="w-10 inline p-2" />
                      <span>Admin</span>
                    </>
                  ) : (
                    <button onClick={() => handleMakeAdmin(user)}>
                      <img src={userIcon} alt="" className="w-10 inline p-2" />
                      <span>User</span>
                    </button>
                  )}
                </td>
                <th>
                  <button
                    onClick={handleUserDetails}
                    className="btn btn-ghost btn-xs"
                  >
                    details
                  </button>
                </th>
                <td>
                  <button onClick={() => handleDelete(user._id)}>
                    <box-icon name="trash" color="gray"></box-icon>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllUsers;
