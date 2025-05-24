/* eslint-disable react/prop-types */
// AdminRoute.js
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import { useQuery } from "react-query";
import Loading from "../../page/Loading/Loading";
import axios from "axios";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  const { 
    data: isAdmin, 
    isLoading: adminLoading,
    error 
  } = useQuery(
    ["isAdmin", user?.email],
    async () => {
      if (!user?.email) return false;
      
      const backendURL = import.meta.env.VITE_BACKEND_URL;
      const token = localStorage.getItem("access_token");
      
      if (!token) return false;

      try {
        const res = await axios.get(`${backendURL}/api/v1/user/${user.email}`, {
          headers: {
            authorization: `bearer ${token}`,
          },
        });
        return res.data.isAdmin;
      } catch (error) {
        console.error("Admin check failed:", error);
        return false;
      }
    },
    {
      enabled: !!user?.email,
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
    }
  );

  if (loading || adminLoading) {
    return <Loading />;
  }

  if (!user || error) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (isAdmin) {
    return children;
  }

  return <Navigate to="/dashboard" state={{ from: location }} replace />;
};

export default AdminRoute;