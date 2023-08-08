/* eslint-disable react/no-unknown-property */

import { Link, Navigate, Outlet } from "react-router-dom";
import "boxicons";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { useQuery } from "react-query";

const DashBoardLayout = () => {
  // todo: load data for admin

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

  const from = location.state?.from?.pathname || "/";
  const { logOut } = useContext(AuthContext);
  const handleLogout = () => {
    logOut()
      .then(() => {
        Navigate(from, { replace: true });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <main className="relative bg-slate-900">
        <section className="relative">
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
                Dashboard Menu
              </label>
              <Outlet></Outlet>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="dashboard-drawer"
                className="drawer-overlay"
              ></label>
              <ul className="menu p-5 w-60 h-full bg-slate-950 text-base-content">
                {/* Sidebar content here */}
                <a
                  href="/"
                  className="inline-flex items-center gap-2.5 text-2xl font-bold  md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-200 mb-10 mx-auto lg:mt-5"
                  aria-label="logo"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    role="img"
                    className="iconify iconify--logos"
                    width="31.88"
                    height="32"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 256 257"
                  >
                    <defs>
                      <linearGradient
                        id="IconifyId1813088fe1fbc01fb466"
                        x1="-.828%"
                        x2="57.636%"
                        y1="7.652%"
                        y2="78.411%"
                      >
                        <stop offset="0%" stopColor="#41D1FF"></stop>
                        <stop offset="100%" stopColor="#BD34FE"></stop>
                      </linearGradient>
                      <linearGradient
                        id="IconifyId1813088fe1fbc01fb467"
                        x1="43.376%"
                        x2="50.316%"
                        y1="2.242%"
                        y2="89.03%"
                      >
                        <stop offset="0%" stopColor="#FFEA83"></stop>
                        <stop offset="8.333%" stopColor="#FFDD35"></stop>
                        <stop offset="100%" stopColor="#FFA800"></stop>
                      </linearGradient>
                    </defs>
                    <path
                      fill="url(#IconifyId1813088fe1fbc01fb466)"
                      d="M255.153 37.938L134.897 252.976c-2.483 4.44-8.862 4.466-11.382.048L.875 37.958c-2.746-4.814 1.371-10.646 6.827-9.67l120.385 21.517a6.537 6.537 0 0 0 2.322-.004l117.867-21.483c5.438-.991 9.574 4.796 6.877 9.62Z"
                    ></path>
                    <path
                      fill="url(#IconifyId1813088fe1fbc01fb467)"
                      d="M185.432.063L96.44 17.501a3.268 3.268 0 0 0-2.634 3.014l-5.474 92.456a3.268 3.268 0 0 0 3.997 3.378l24.777-5.718c2.318-.535 4.413 1.507 3.936 3.838l-7.361 36.047c-.495 2.426 1.782 4.5 4.151 3.78l15.304-4.649c2.372-.72 4.652 1.36 4.15 3.788l-11.698 56.621c-.732 3.542 3.979 5.473 5.943 2.437l1.313-2.028l72.516-144.72c1.215-2.423-.88-5.186-3.54-4.672l-25.505 4.922c-2.396.462-4.435-1.77-3.759-4.114l16.646-57.705c.677-2.35-1.37-4.583-3.769-4.113Z"
                    ></path>
                  </svg>
                  Shoishob
                </a>

                {isSuperAdmin ? (
                  <>
                    <li>
                      <Link
                        to="/dashboard/adminHome"
                        className="  text-gray-400 transition duration-100 hover:text-white active:text-indigo-900 px-10"
                      >
                        <box-icon name="home" color="white"></box-icon>
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dashboard/allTurfs"
                        className="  text-gray-400 transition duration-100 hover:text-white active:text-indigo-900 px-10"
                      >
                        <box-icon name="hive" color="white"></box-icon>
                        All Turf
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dashboard/addTurf"
                        className="  text-gray-400 transition duration-100 hover:text-white active:text-indigo-900 px-10"
                      >
                        <box-icon
                          type="solid"
                          name="component"
                          color="white"
                        ></box-icon>
                        Add Turf
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dashboard/allUsers"
                        className="  text-gray-400 transition duration-100 hover:text-white active:bg-slate-100   px-10"
                      >
                        <box-icon name="user-circle" color="white"></box-icon>
                        All User
                      </Link>
                      <Link
                        to="/dashboard/allAdmin"
                        className="  text-gray-400 transition duration-100 hover:text-white active:bg-slate-100   px-10"
                      >
                        <box-icon
                          name="shield-quarter"
                          color="white"
                        ></box-icon>
                        All Admin
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dashboard/allBookings"
                        className=" text-gray-400 transition duration-100 hover:text-white active:text-indigo-900 px-10"
                      >
                        <box-icon name="bookmark" color="white"></box-icon>
                        All Booking
                      </Link>
                    </li>
                    <li>
                      <a className=" text-gray-400 transition duration-100 hover:text-white active:text-indigo-900 px-10">
                        <box-icon name="trophy" color="white"></box-icon>
                        Leader Board
                      </a>
                    </li>

                    <li>
                      <a className=" text-gray-400 transition duration-100 hover:text-white active:text-indigo-900 px-10">
                        <box-icon name="purchase-tag" color="white"></box-icon>
                        Payment
                      </a>
                    </li>
                  </>
                ) : isAdmin ? (
                  <>
                    <li>
                      <Link
                        to="/dashboard/ownerHome"
                        className="  text-gray-400 transition duration-100 hover:text-white active:text-indigo-900 px-10"
                      >
                        <box-icon name="home" color="white"></box-icon>
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dashboard/myProfile"
                        className="  text-gray-400 transition duration-100 hover:text-white active:text-indigo-900 px-10"
                      >
                        <box-icon name="user-circle" color="white"></box-icon>
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <a className="  text-gray-400 transition duration-100 hover:text-white active:text-indigo-900 px-10">
                        <box-icon name="badge-check" color="white"></box-icon>
                        Turf Profile
                      </a>
                    </li>

                    <li>
                      <Link
                        to="/dashboard/ownerbookings"
                        className=" text-gray-400 transition duration-100 hover:text-white active:text-indigo-900 px-10"
                      >
                        <box-icon
                          name="calendar-event"
                          color="white"
                        ></box-icon>
                        All Booking
                      </Link>
                    </li>
                    <li>
                      <a className=" text-gray-400 transition duration-100 hover:text-white active:text-indigo-900 px-10">
                        <box-icon name="trophy" color="white"></box-icon>
                        Leader Board
                      </a>
                    </li>

                    <li>
                      <a className=" text-gray-400 transition duration-100 hover:text-white active:text-indigo-900 px-10">
                        <box-icon name="purchase-tag" color="white"></box-icon>
                        Payment
                      </a>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        to="/dashboard/userHome"
                        className="  text-gray-400 transition duration-100 hover:text-white active:text-indigo-900 px-10"
                      >
                        <box-icon name="user" color="white"></box-icon>
                        User Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dashboard/myProfile"
                        className="  text-gray-400 transition duration-100 hover:text-white active:text-indigo-900 px-10"
                      >
                        <box-icon name="user" color="white"></box-icon>
                        My Profile
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/dashboard/usermybookings"
                        className=" text-gray-400 transition duration-100 hover:text-white active:text-indigo-900 px-10"
                      >
                        <box-icon name="bookmark" color="white"></box-icon>
                        My Booking
                      </Link>
                    </li>
                    <li>
                      <a className=" text-gray-400 transition duration-100 hover:text-white active:text-indigo-900 px-10">
                        <box-icon name="trophy" color="white"></box-icon>
                        Leader Board
                      </a>
                    </li>
                    <li>
                      <a className=" text-gray-400 transition duration-100 hover:text-white active:text-indigo-900 px-10">
                        <box-icon name="comment" color="white"></box-icon>
                        Give Review
                      </a>
                    </li>
                    <li>
                      <Link className=" text-gray-400 transition duration-100 hover:text-white active:text-indigo-900 px-10">
                        <box-icon name="purchase-tag" color="white"></box-icon>
                        Payments
                      </Link>
                    </li>
                  </>
                )}

                <hr className="mt-5 mb-5" />
                <li>
                  <Link
                    to="/"
                    className=" text-gray-400 transition duration-100 hover:text-white active:text-indigo-900 px-10"
                  >
                    <box-icon name="home" color="white"></box-icon>
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/booking"
                    className=" text-gray-400 transition duration-100 hover:text-white active:text-indigo-900 px-10"
                  >
                    <box-icon name="briefcase" color="white"></box-icon>
                    Booking
                  </Link>
                </li>
                <li>
                  <Link
                    to="/review"
                    className=" text-gray-400 transition duration-100 hover:text-white active:text-indigo-900 px-10"
                  >
                    <box-icon
                      name="message-square-edit"
                      color="white"
                    ></box-icon>
                    Review
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className=" text-gray-400 transition duration-100 hover:text-white active:text-indigo-900 px-10"
                  >
                    <box-icon name="label" color="white"></box-icon>
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className=" text-gray-400 transition duration-100 hover:text-white active:text-indigo-900 px-10"
                  >
                    <box-icon name="mail-send" color="white"></box-icon>
                    Contact
                  </Link>
                </li>

                <li>
                  <Link
                    onClick={handleLogout}
                    className=" text-gray-400 transition duration-100 hover:text-white active:text-indigo-900 px-10"
                  >
                    <box-icon name="log-out" color="white"></box-icon>
                    LogOut
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <div
          className="absolute inset-0 blur-[118px] max-w-lg h-[1400px] mx-auto sm:max-w-3xl sm:h-[400px]"
          style={{
            background:
              "linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)",
            zIndex: -1,
          }}
        ></div>
      </main>
    </>
  );
};

export default DashBoardLayout;
