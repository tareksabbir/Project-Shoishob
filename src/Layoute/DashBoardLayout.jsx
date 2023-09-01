/* eslint-disable react/no-unknown-property */

import { Link, Navigate, Outlet } from "react-router-dom";
import "boxicons";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { useQuery } from "react-query";
import icon from "../assets/icons/Untitled design (2).png"
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
                  className="inline-flex items-center  text-2xl font-bold  md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-200 mb-10 mx-auto lg:mt-5"
                  aria-label="logo"
                >
                  <img src={icon} alt=""className="h-12" />
              <p>Shoishob</p>
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
                      <Link to="/dashboard/addTournament" className=" text-gray-400 transition duration-100 hover:text-white active:text-indigo-900 px-10">
                      <box-icon name='add-to-queue' color="white"></box-icon>
                        Registration
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
                        Pay History
                      </a>
                    </li>
                  </>
                ) : (
                  <>
                    {/* <li>
                      <Link
                        to="/dashboard/userHome"
                        className="  text-gray-400 transition duration-100 hover:text-white active:text-indigo-900 px-10"
                      >
                        <box-icon name="user" color="white"></box-icon>
                        User Home
                      </Link>
                    </li> */}
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
                      <Link to="/dashboard/leaderBoard" className=" text-gray-400 transition duration-100 hover:text-white active:text-indigo-900 px-10">
                        <box-icon name="trophy" color="white"></box-icon>
                        Leader Board
                      </Link>
                    </li>
                    <li>
                      <a className=" text-gray-400 transition duration-100 hover:text-white active:text-indigo-900 px-10">
                        <box-icon name="comment" color="white"></box-icon>
                        Give Review
                      </a>
                    </li>
                    <li>
                      <Link to={"/dashboard/history"} className=" text-gray-400 transition duration-100 hover:text-white active:text-indigo-900 px-10">
                        <box-icon name="purchase-tag" color="white"></box-icon>
                        Pay History
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
