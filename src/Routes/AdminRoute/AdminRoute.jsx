/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../../Context/AuthProvider";
import { useQuery } from "react-query";
import Loading from "../../page/Loading/Loading";
import axios from "axios";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const { data: isAdmin } = useQuery(["isAdmin", user?.email], async () => {
    const backendURL = import.meta.env.VITE_BACKEND_URL;

    const res = await axios.get(`${backendURL}/api/v1/user/${user?.email}`, {
      headers: {
        authorization: `bearer ${localStorage.getItem("access_token")}`,
      },
    });

    return res.data.isAdmin;
  });

  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (user && isAdmin) {
    return children;
  }

  // Add redirection for unauthorized users
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminRoute;

