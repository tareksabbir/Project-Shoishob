import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthProvider";
import { useQuery } from "react-query";
import axios from "axios";
import AdminHome from "../AdminHome/AdminHome";
import OwnerHome from "../OwnerHome/OwnerHome";
import MyProfile from "../MyProfile/MyProfile";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

  const { data: isAdmin } = useQuery(["isAdmin", user?.email], async () => {
    if (!user?.email) return false;

    const res = await axios.get(`${API_URL}/api/v1/user/${user?.email}`, {
      headers: {
        authorization: `bearer ${localStorage.getItem("access_token")}`,
      },
    });

    return res.data.isAdmin;
  });

  const { data: isSuperAdmin } = useQuery(
    ["isSuperAdmin", user?.email],
    async () => {
      if (!user?.email) return false;

      const res = await axios.get(`${API_URL}/api/v1/admin/${user?.email}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("access_token")}`,
        },
      });

      return res.data.isSuperAdmin;
    }
  );
  return (
    <>
      {isSuperAdmin ? (
        <AdminHome></AdminHome>
      ) : isAdmin ? (
        <OwnerHome></OwnerHome>
      ) : (
        <MyProfile></MyProfile>
      )}
    </>
  );
};

export default Dashboard;
