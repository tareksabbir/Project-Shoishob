/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../../Context/AuthProvider";
import { useQuery } from "react-query";
import Loading from "../../page/Loading/Loading";

const SuperAdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
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
  const location = useLocation();

  if (loading) {
    return <Loading></Loading>;
  }

  if (user && isSuperAdmin) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default SuperAdminRoute;
