/* eslint-disable react/no-unknown-property */
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { Link } from "react-router-dom";
import icon from "../assets/icons/Untitled design (2).png";

export default function Navbar() {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="pb-6 sm:pb-8 lg:pb-0 print:hidden">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <header className="flex items-center justify-between py-4 md:mb-12 md:py-8 xl:mb-0">
            <Link
              to="/"
              className="inline-flex items-center gap-0 text-2xl font-bold md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-gray-500"
              aria-label="logo"
            >
              <img src={icon} alt="Shoishob Logo" className="h-16" />
              <p>Shoishob</p>
            </Link>

            <nav className="hidden gap-12 lg:flex">
              <Link to="/" className="text-sm font-semibold text-cyan-500">
                Home
              </Link>
              <Link
                to="/booking"
                className="text-sm font-semibold text-gray-400 transition duration-100 hover:text-cyan-500 active:text-indigo-900"
              >
                Booking
              </Link>
              <Link
                to="/leaderBoard"
                className="text-sm font-semibold text-gray-400 transition duration-100 hover:text-cyan-500 active:text-indigo-900"
              >
                Leader Board
              </Link>
              <Link
                to="/about"
                className="text-sm font-semibold text-gray-400 transition duration-100 hover:text-cyan-500 active:text-indigo-900"
              >
                About
              </Link>

              {user?.uid ? (
                <>
                  <Link
                    to="/review"
                    className="text-sm font-semibold text-gray-400 transition duration-100 hover:text-cyan-500 active:text-indigo-900"
                  >
                    Review
                  </Link>
                  <Link
                    to="/dashboard"
                    className="text-sm font-semibold text-gray-400 transition duration-100 hover:text-cyan-500 active:text-indigo-900"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-sm font-semibold text-gray-400 transition duration-100 hover:text-cyan-500 active:text-indigo-900"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="text-sm font-semibold text-gray-400 transition duration-100 hover:text-cyan-500 active:text-indigo-900"
                >
                  Login
                </Link>
              )}
            </nav>

            <Link
              to="/contact"
              className="hidden rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-sm lg:inline-block"
            >
              Contact Sales
            </Link>

            <label
              htmlFor="dashboard-drawer"
              className="inline-flex items-center gap-2 rounded-lg bg-gray-200 px-2.5 py-2 text-sm font-semibold text-gray-500 ring-indigo-300 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-sm lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Menu
            </label>
          </header>
        </div>
      </div>
    </>
  );
}
