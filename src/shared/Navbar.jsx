/* eslint-disable react/no-unknown-property */
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { Link, useLocation } from "react-router-dom";
import icon from "../assets/icons/Untitled design (2).png";

export default function Navbar() {
  const { user, logOut } = useContext(AuthContext);
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logOut()
      .then(() => {
        setIsMobileMenuOpen(false);
      })
      .catch((err) => console.log(err));
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Check if route is active
  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  // Navigation items configuration
  const navigationItems = [
    { to: "/", label: "Home", icon: "home" },
    { to: "/booking", label: "Booking", icon: "briefcase" },
    { to: "/leaderBoard", label: "Leader Board", icon: "trophy" },
    { to: "/review", label: "Review", icon: "info-circle" },
    { to: "/about", label: "About", icon: "info-circle" },
    { to: "/contact", label: "Contact", icon: "info-circle" },
  ];

  const userNavigationItems = [
    { to: "/dashboard", label: "Dashboard", icon: "dashboard" },
  ];

  const renderNavLink = ({ to, label, icon, isMobile = false }) => {
    const isActive = isActiveRoute(to);
    const baseClasses = isMobile
      ? "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group"
      : "relative px-4 py-2 text-sm font-semibold transition-all duration-300 group";

    const activeClasses = isActive
      ? isMobile
        ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg"
        : "text-cyan-400"
      : isMobile
      ? "text-gray-300 hover:text-white hover:bg-white/10"
      : "text-gray-400 hover:text-cyan-400";

    return (
      <Link
        key={to}
        to={to}
        onClick={isMobile ? closeMobileMenu : undefined}
        className={`${baseClasses} ${activeClasses}`}
      >
        {isMobile && (
          <div
            className={`p-2 rounded-lg ${
              isActive ? "bg-white/20" : "bg-white/10"
            }`}
          >
            <box-icon
              name={icon}
              color={isActive ? "white" : "#9ca3af"}
              size="18px"
            ></box-icon>
          </div>
        )}

        <span className={isMobile ? "font-medium" : ""}>{label}</span>

        {!isMobile && (
          <div
            className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transform transition-transform duration-300 ${
              isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
            }`}
          ></div>
        )}
      </Link>
    );
  };

  return (
    <>
      {/* Backdrop blur overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeMobileMenu}
        ></div>
      )}

      <div
        className={`sticky top-0 z-50 transition-all duration-300 print:hidden ${
          isScrolled || isMobileMenuOpen
            ? "bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <header className="flex items-center justify-between py-4 md:py-6">
            {/* Logo */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-2xl font-bold md:text-3xl group"
              aria-label="Shoishob Logo"
              onClick={closeMobileMenu}
            >
              <div className="relative">
                <img
                  src={icon}
                  alt="Shoishob Logo"
                  className="h-12 md:h-14 drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span
                className={`bg-gradient-to-r transition-all duration-300 bg-clip-text text-transparent group-hover:from-cyan-400 group-hover:to-blue-400 ${
                  isScrolled || isMobileMenuOpen
                    ? "from-white via-cyan-100 to-blue-100"
                    : "from-white via-white to-gray-100"
                }`}
              >
                Shoishob
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2">
              {navigationItems.map((item) => renderNavLink(item))}

              {user?.uid &&
                userNavigationItems.map((item) => renderNavLink(item))}
            </nav>

            {/* Desktop Auth Section */}
            <div className="hidden lg:flex items-center gap-4">
              {user?.uid ? (
                <div className="flex items-center gap-4">
                  {/* User Avatar */}
                  <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-xl backdrop-blur-sm border border-slate-600/30">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                      <box-icon
                        name="user"
                        color="white"
                        size="16px"
                      ></box-icon>
                    </div>
                    <span className="text-white text-sm font-medium truncate max-w-32">
                      {user?.displayName || user?.email}
                    </span>
                  </div>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-semibold text-gray-400 hover:text-red-400 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <box-icon
                      name="log-out"
                      color="#ef4444"
                      size="16px"
                    ></box-icon>
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <Link
                    to="/login"
                    className="px-6 py-2 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
                  >
                    Login
                  </Link>
                  <Link
                    to="/contact"
                    className="px-6 py-2 text-sm font-semibold text-gray-300 border border-gray-600 rounded-lg hover:bg-white/10 transition-all duration-300"
                  >
                    Contact
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors duration-300 relative z-50"
              aria-label="Toggle mobile menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span
                  className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                    isMobileMenuOpen
                      ? "rotate-45 translate-y-1"
                      : "-translate-y-1"
                  }`}
                ></span>
                <span
                  className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                ></span>
                <span
                  className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                    isMobileMenuOpen
                      ? "-rotate-45 -translate-y-1"
                      : "translate-y-1"
                  }`}
                ></span>
              </div>
            </button>
          </header>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden absolute top-full left-0 right-0 transition-all duration-300 ${
            isMobileMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
          } ${
            isScrolled || isMobileMenuOpen
              ? "bg-slate-900/98 backdrop-blur-xl border-b border-slate-700/50 shadow-2xl"
              : "bg-slate-900/90 backdrop-blur-lg"
          }`}
        >
          <div className="p-6 space-y-1">
            {/* Navigation Links */}
            <div className="space-y-2 mb-6">
              {navigationItems.map((item) =>
                renderNavLink({ ...item, isMobile: true })
              )}

              {user?.uid && (
                <>
                  <div className="border-t border-slate-700/50 my-4"></div>
                  {userNavigationItems.map((item) =>
                    renderNavLink({ ...item, isMobile: true })
                  )}
                </>
              )}
            </div>

            {/* Mobile Auth Section */}
            <div className="border-t border-slate-700/50 pt-6">
              {user?.uid ? (
                <div className="space-y-4">
                  {/* User Info */}
                  <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-xl backdrop-blur-sm border border-slate-600/30">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                      <box-icon
                        name="user"
                        color="white"
                        size="20px"
                      ></box-icon>
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium text-sm truncate">
                        {user?.displayName || user?.email}
                      </p>
                      <p className="text-gray-400 text-xs">Welcome back!</p>
                    </div>
                  </div>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 w-full text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-300 border border-transparent hover:border-red-500/30"
                  >
                    <div className="p-2 rounded-lg bg-red-500/20">
                      <box-icon
                        name="log-out"
                        color="#ef4444"
                        size="18px"
                      ></box-icon>
                    </div>
                    <span className="font-medium">Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="block w-full px-4 py-3 text-center text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg"
                  >
                    Login
                  </Link>
                  <Link
                    to="/contact"
                    onClick={closeMobileMenu}
                    className="block w-full px-4 py-3 text-center text-sm font-semibold text-gray-300 border border-gray-600 rounded-xl hover:bg-white/10 transition-all duration-300"
                  >
                    Contact Sales
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
