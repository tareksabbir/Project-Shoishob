import { useQuery } from "react-query";
import adminIcon from "../../../assets/icons/star (4).png";
import superIcon from "../../../assets/icons/star (2).png";
import Swal from "sweetalert2";
const AllAdmin = () => {
  const { data: admins = [], refetch } = useQuery(["admins"], async () => {
    const res = await fetch("http://localhost:5000/api/v1/admin", {
      headers: {
        authorization: `bearer ${localStorage.getItem("access_token")}`,
      },
    });
    const data = await res.json();
    return data.data;
  });

  const handleMakeSuperAdmin = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You Wanted To Make Him Super Admin!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#5ac5a6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        const makeAdmin = { role: "superAdmin" };
        fetch(`http://localhost:5000/api/v1/admin/${id}`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(makeAdmin),
        })
          .then((res) => res.json())
          .then(() => {
            Swal.fire(
              "Done!!",
              "User Become Super Admin Successfully ",
              "success"
            );
            refetch();
          });
      }
    });
  };

  const handleadminDetails = () => {
    console.log("admin profile ");
  };

  const handleDelete = (admin) => {
    const id = admin._id;
    Swal.fire({
      title: "Are you sure?",
      text: "You Wanted Delete This admin!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#5ac5a6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/api/v1/admin/${id}`, {
          method: "DELETE",
        }).then(() => {
          Swal.fire("Done!!", "admin Deleted Successfully ", "success");
          refetch();
          handleDelteUserFromUserDB(admin.id);
        });
      }
    });
  };
  const handleDelteUserFromUserDB = (id) => {
    fetch(`http://localhost:5000/api/v1/user/${id}`, {
      method: "DELETE",
    }).then(() => {});
  };

  return (
    <>
      <div className="overflow-x-auto lg:p-20">
        <table className="table bg-slate-900">
          {/* head */}
          <thead>
            <tr>
              <th className=" bg-slate-700 rounded-tl-xl py-4">
                <label>admin</label>
              </th>
              <th className=" bg-slate-700 text-slate-300">Name</th>
              <th className=" bg-slate-700 text-slate-300">Email & admin Id</th>

              <th className=" bg-slate-700 text-slate-300 text-center">Role</th>

              <th className=" bg-slate-700 text-slate-300 ">Details</th>
              <th className=" bg-slate-700 text-slate-300 rounded-tr-xl">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {admins.map((admin, index) => (
              <tr key={admin._id}>
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
                          src={admin.photo}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{admin.name}</div>
                      <div className="text-sm opacity-50">Chittagong</div>
                    </div>
                  </div>
                </td>
                <td>
                  {admin.email}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    id : {admin._id}
                  </span>
                </td>

                <td>
                  {admin.role === "superAdmin" ? (
                    <>
                      <img src={superIcon} alt="" className="w-10 inline p-2" />
                      <span>Super Admin</span>
                    </>
                  ) : (
                    <button onClick={() => handleMakeSuperAdmin(admin._id)}>
                      <img
                        src={adminIcon}
                        alt="adminIcon"
                        className="w-10 inline p-2"
                      />
                      <span>Admin</span>
                    </button>
                  )}
                </td>
                <th>
                  <button
                    onClick={handleadminDetails}
                    className="btn btn-ghost btn-xs"
                  >
                    details
                  </button>
                </th>
                <td>
                  <button onClick={() => handleDelete(admin)}>
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

export default AllAdmin;
