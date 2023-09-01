/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import icon from "../../assets/icons/Untitled design (2).png";
const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return (
      <>
        <div className=" bg-slate-900 w-full min-h-screen flex justify-center items-center">
          <div className="flex min-h-screen w-full items-center justify-center bg-slate-900">
            <div className="flex items-center justify-center">
              <a
                href="/"
                className="inline-flex items-center gap-2.5 text-2xl font-bold  md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-200"
                aria-label="logo"
              >
               <img src={icon} alt="" className="h-16" />
                Please Wait..
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
