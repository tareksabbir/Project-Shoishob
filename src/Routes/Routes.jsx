/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
// router.js
import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import AdminRoute from "./AdminRoute/AdminRoute";
import SuperAdminRoute from "./SuperAdminRoute/SuperAdminRoute";
import Main from "../Layoute/Main";
import DashBoardLayout from "../Layoute/DashBoardLayout";
import Loading from "../page/Loading/Loading";

// Lazy load components for better performance
const Home = lazy(() => import("../page/Home/Home"));
const About = lazy(() => import("../page/About/About"));
const Contact = lazy(() => import("../page/Contact/Contact"));
const Login = lazy(() => import("../page/Login/Login"));
const SignUp = lazy(() => import("../page/SignUp/SignUp"));
const Review = lazy(() => import("../page/Review/Review"));
const Dashboard = lazy(() => import("../page/Dashboard/Dashboard/Dashboard"));
const TurfDetails = lazy(() => import("../page/TurfDetails/TurfDetails"));
const AllUsers = lazy(() => import("../page/Dashboard/AllUsers/AllUsers"));
const AllAdmin = lazy(() => import("../page/Dashboard/AlllAdmin/AllAdmin"));
const AllBookings = lazy(() => import("../page/Dashboard/AllBookings/AllBookings"));
const MyProfile = lazy(() => import("../page/Dashboard/MyProfile/MyProfile"));
const UserMyBooking = lazy(() => import("../page/Dashboard/UserMyBooking/UserMyBooking"));
const AllTurfs = lazy(() => import("../page/Dashboard/AllTurfs/AllTurfs"));
const AddTurf = lazy(() => import("../page/Dashboard/AddTurf/AddTurf"));
const AdminBooking = lazy(() => import("../page/Dashboard/AdminBooking/AdminBooking"));
const Payment = lazy(() => import("../page/Dashboard/Payment/Payment"));
const PaymentSuccess = lazy(() => import("../page/Dashboard/PaymentSuccess/PaymentSuccess"));
const UserHome = lazy(() => import("../page/Dashboard/UserHome/UserHome"));
const OwnerHome = lazy(() => import("../page/Dashboard/OwnerHome/OwnerHome"));
const AdminHome = lazy(() => import("../page/Dashboard/AdminHome/AdminHome"));
const TournamentForm = lazy(() => import("../page/Dashboard/Tournament/Details/TournamentForm"));
const TournamentBooking = lazy(() => import("../page/TournamentBooking/TournamentBooking"));
const RegistrationForm = lazy(() => import("../page/TournamentBooking/RegistrationForm"));
const TournamentPayment = lazy(() => import("../page/Dashboard/PaymentSuccess/TournamentPayment"));
const LeaderBoard = lazy(() => import("../page/LeaderBoard/LeaderBoard"));
const TurfUpdates = lazy(() => import("../page/Dashboard/Updates/TurfUpdates/TurfUpdates"));
const PayHistory = lazy(() => import("../page/Dashboard/PayHistory/PayHistory"));
const OwnerTurfData = lazy(() => import("../page/Dashboard/OwnerTurf/OwnerTurfData"));
const BookingHero = lazy(() => import("../page/Booking/BookingHero"));

// Wrapper component for lazy loading with suspense
const LazyWrapper = ({ children }) => (
  <Suspense fallback={<Loading />}>
    {children}
  </Suspense>
);

// Route protection wrapper
const ProtectedRoute = ({ children, protection = "private" }) => {
  const protectionComponents = {
    private: PrivateRoute,
    admin: AdminRoute,
    superAdmin: SuperAdminRoute,
  };

  const ProtectionComponent = protectionComponents[protection];
  
  return (
    <LazyWrapper>
      <ProtectionComponent>
        {children}
      </ProtectionComponent>
    </LazyWrapper>
  );
};

// Public routes configuration
const publicRoutes = [
  { path: "/", element: <Home /> },
  { path: "/contact", element: <Contact /> },
  { path: "/about", element: <About /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/review", element: <Review /> },
  { path: "/leaderBoard", element: <LeaderBoard /> },
  { path: "/turf/:id", element: <TurfDetails /> },
];

// Private routes configuration
const privateRoutes = [
  { path: "/tournament-booking/:id", element: <TournamentBooking /> },
  { path: "/registration-form/:id", element: <RegistrationForm /> },
  { path: "/booking", element: <BookingHero /> },
];

// Payment routes (accessible without dashboard layout)
const paymentRoutes = [
  { path: "/dashboard/payment/success", element: <PaymentSuccess /> },
  { path: "/dashboard/tournament/payment/success", element: <TournamentPayment /> },
];

// Dashboard routes configuration
const dashboardRoutes = [
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/dashboard/myProfile", element: <MyProfile /> },
  { path: "/dashboard/history", element: <PayHistory /> },
  { path: "/dashboard/leaderBoard", element: <LeaderBoard /> },
];

// User-specific dashboard routes
const userDashboardRoutes = [
  { path: "/dashboard/userHome", element: <UserHome /> },
  { path: "/dashboard/usermybookings", element: <UserMyBooking /> },
  { path: "/dashboard/payment/:id", element: <Payment /> },
];

// Owner-specific dashboard routes
const ownerDashboardRoutes = [
  { path: "/dashboard/ownerHome", element: <OwnerHome /> },
  { path: "/dashboard/OwnerTurfData", element: <OwnerTurfData /> },
  { path: "/dashboard/ownerbookings", element: <AdminBooking /> },
  { path: "/dashboard/addTurf", element: <AddTurf /> },
  { path: "/dashboard/turfUpdate/:id", element: <TurfUpdates /> },
];

// Admin-specific dashboard routes
const adminDashboardRoutes = [
  { path: "/dashboard/adminHome", element: <AdminHome /> },
  { path: "/dashboard/allTurfs", element: <AllTurfs /> },
  { path: "/dashboard/addTournament", element: <TournamentForm /> },
];

// Super admin routes
const superAdminRoutes = [
  { path: "/dashboard/allUsers", element: <AllUsers />, protection: "superAdmin" },
  { path: "/dashboard/allAdmin", element: <AllAdmin />, protection: "superAdmin" },
  { path: "/dashboard/allBookings", element: <AllBookings />, protection: "superAdmin" },
];

// Create route objects with proper protection
const createRoutes = (routes, defaultProtection = "private") =>
  routes.map(({ path, element, protection = defaultProtection }) => ({
    path,
    element: protection ? (
      <ProtectedRoute protection={protection}>
        {element}
      </ProtectedRoute>
    ) : (
      <LazyWrapper>{element}</LazyWrapper>
    ),
  }));

// Main router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      // Public routes (no protection)
      ...createRoutes(publicRoutes, null),
      // Private routes
      ...createRoutes(privateRoutes),
      // Payment routes (private but outside dashboard)
      ...createRoutes(paymentRoutes),
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashBoardLayout />
      </ProtectedRoute>
    ),
    children: [
      // Common dashboard routes
      ...createRoutes(dashboardRoutes),
      // User dashboard routes
      ...createRoutes(userDashboardRoutes),
      // Owner dashboard routes
      ...createRoutes(ownerDashboardRoutes),
      // Admin dashboard routes
      ...createRoutes(adminDashboardRoutes),
      // Super admin routes
      ...createRoutes(superAdminRoutes, "superAdmin"),
    ],
  },
]);

export default router;