import { useContext } from "react";
import { useQuery } from "react-query";
import { AuthContext } from "../Context/AuthProvider";
import axios from "axios";

export const useUserRole = () => {
  const { user } = useContext(AuthContext);

  const { data: userRole, isLoading, error } = useQuery(
    ["userRole", user?.email],
    async () => {
      if (!user?.email) return null;
      
      const backendURL = import.meta.env.VITE_BACKEND_URL;
      const token = localStorage.getItem("access_token");
      
      if (!token) return null;

      try {
        // Check super admin first
        const superAdminRes = await axios.get(`${backendURL}/api/v1/admin/${user.email}`, {
          headers: { authorization: `bearer ${token}` },
        });
        
        if (superAdminRes.data.isSuperAdmin) {
          return { role: "superAdmin", isSuperAdmin: true, isAdmin: true };
        }

        // Check regular admin
        const adminRes = await axios.get(`${backendURL}/api/v1/user/${user.email}`, {
          headers: { authorization: `bearer ${token}` },
        });
        
        if (adminRes.data.isAdmin) {
          return { role: "admin", isAdmin: true, isSuperAdmin: false };
        }

        return { role: "user", isAdmin: false, isSuperAdmin: false };
      } catch (error) {
        console.error("Role check failed:", error);
        return null;
      }
    },
    {
      enabled: !!user?.email,
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      retry: 1,
    }
  );

  return {
    userRole: userRole?.role || "user",
    isAdmin: userRole?.isAdmin || false,
    isSuperAdmin: userRole?.isSuperAdmin || false,
    isLoading,
    error,
  };
};