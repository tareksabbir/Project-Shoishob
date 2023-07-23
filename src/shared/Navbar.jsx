/* eslint-disable react/no-unknown-property */
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";

export default function Navbar() {
  const { user, logOut } = useContext(AuthContext);
  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-white pb-6 sm:pb-8 lg:pb-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <header className="mb-8 flex items-center justify-between py-4 md:mb-12 md:py-8 xl:mb-1">
          <a
            href="/"
            className="inline-flex items-center gap-2.5 text-2xl font-bold  md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-400"
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

          <nav className="hidden gap-12 lg:flex">
            <a href="/" className="text-lg font-semibold text-indigo-500">
              Home
            </a>
            <a
              href="/booking"
              className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-400 active:text-indigo-900"
            >
              Booking
            </a>

            <a
              href="/about"
              className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-400 active:text-indigo-900"
            >
              About
            </a>

            {user?.uid ? (
              <>
                <button
                  onClick={handleLogout}
                  className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-400 active:text-indigo-900"
                >
                  Sign Out
                </button>
                <a
                  href="/review"
                  className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-400 active:text-indigo-900"
                >
                  review
                </a>
                <a
                  href="/dashboard"
                  className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-400 active:text-indigo-900"
                >
                  Dashboard
                </a>
              </>
            ) : (
              <a
                href="/login"
                className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-400 active:text-indigo-900"
              >
                Login
              </a>
            )}
          </nav>

          <a
            href="/contact"
            className="hidden rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base lg:inline-block"
          >
            Contact Sales
          </a>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-gray-200 px-2.5 py-2 text-sm font-semibold text-gray-500 ring-indigo-300 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base lg:hidden"
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
          </button>
        </header>
      </div>
    </div>
  );
}
