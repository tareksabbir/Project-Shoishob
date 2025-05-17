/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../../Context/AuthProvider";
import { useQuery } from "react-query";
import Loading from "../../page/Loading/Loading";
import axios from "axios";

const SuperAdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  const { data: isSuperAdmin } = useQuery(
    ["isSuperAdmin", user?.email],
    async () => {
      const backendURL = import.meta.env.VITE_BACKEND_URL;

      const res = await axios.get(`${backendURL}/api/v1/admin/${user?.email}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("access_token")}`,
        },
      });

      return res.data.isSuperAdmin;
    }
  );

  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (user && isSuperAdmin) {
    return children;
  }

  // Redirect if unauthorized
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default SuperAdminRoute;
