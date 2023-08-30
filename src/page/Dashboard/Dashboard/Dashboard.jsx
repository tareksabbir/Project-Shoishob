import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthProvider";
import { useQuery } from "react-query";
import AdminHome from "../AdminHome/AdminHome";
import OwnerHome from "../OwnerHome/OwnerHome";
import MyProfile from "../MyProfile/MyProfile";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const { data: isAdmin } = useQuery(["isAdmin", user?.email], async () => {
    const res = await fetch(
      `http://localhost:5000/api/v1/user/${user?.email}`,
      {
        headers: {
          authorization: `bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );

    const data = await res.json();
    return data.isAdmin;
  });

  const { data: isSuperAdmin } = useQuery(
    ["isSuperAdmin", user?.email],
    async () => {
      const res = await fetch(
        `http://localhost:5000/api/v1/admin/${user?.email}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      const data = await res.json();
      return data.isSuperAdmin;
    }
  );
  return (
    <>
      {
        isSuperAdmin ? <AdminHome></AdminHome> : isAdmin ? <OwnerHome></OwnerHome> : <MyProfile></MyProfile>
      }
    </>
  );
};

export default Dashboard;
