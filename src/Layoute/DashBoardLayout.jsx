import { Outlet } from "react-router-dom";
import Navbar from "../shared/navbar";

const DashBoardLayout = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className="drawer lg:drawer-open">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          <label
            htmlFor="dashboard-drawer"
            className="btn btn-primary drawer-button lg:hidden w-full"
          >
            Open drawer
          </label>
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-full bg-white text-base-content">
            {/* Sidebar content here */}
            <li>
              <a className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-gray-800 active:text-indigo-900">
                Sidebar Item 1
              </a>
            </li>
            <li>
              <a className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-gray-800 active:text-indigo-900 mt-2">
                Sidebar Item 2
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default DashBoardLayout;
