import { createBrowserRouter } from "react-router-dom";

import Home from "../page/Home/Home";
import About from "../page/About/About";

import Contact from "../page/Contact/Contact";
import Login from "../page/Login/Login";
import SignUp from "../page/SignUp/SignUp";
import Review from "../page/Review/Review";
import Dashboard from "../page/Dashboard/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import DashBoardLayout from "../Layoute/DashBoardLayout";
import TurfDetails from "../page/TurfDetails/TurfDetails";
import AllUsers from "../page/Dashboard/AllUsers/AllUsers";
import AllAdmin from "../page/Dashboard/AlllAdmin/AllAdmin";
import AllBookings from "../page/Dashboard/AllBookings/AllBookings";
import SuperAdminRoute from "./SuperAdminRoute/SuperAdminRoute";
import MyProfile from "../page/Dashboard/MyProfile/MyProfile";
import Main from "../Layoute/Main";
import UserMyBooking from "../page/Dashboard/UserMyBooking/UserMyBooking";
import AllTurfs from "../page/Dashboard/AllTurfs/AllTurfs";
import AddTurf from "../page/Dashboard/AddTurf/AddTurf";
import AdminBooking from "../page/Dashboard/AdminBooking/AdminBooking";
import Payment from "../page/Dashboard/Payment/Payment";
import PaymentSuccess from "../page/Dashboard/PaymentSuccess/PaymentSuccess";
import UserHome from "../page/Dashboard/UserHome/UserHome";
import OwnerHome from "../page/Dashboard/OwnerHome/OwnerHome";
import AdminHome from "../page/Dashboard/AdminHome/AdminHome";
import TournamentForm from "../page/Dashboard/Tournament/Details/TournamentForm";
import TournamentBooking from "../page/TournamentBooking/TournamentBooking";
import RegistrationForm from "../page/TournamentBooking/RegistrationForm";
import TournamentPayment from "../page/Dashboard/PaymentSuccess/TournamentPayment";
import LeaderBoard from "../page/LeaderBoard/LeaderBoard";
import TurfUpdates from "../page/Dashboard/Updates/TurfUpdates/TurfUpdates";
import PayHistory from "../page/Dashboard/PayHistory/PayHistory";
import OwnerTurfData from "../page/Dashboard/OwnerTurf/OwnerTurfData";
import BookingHero from "../page/Booking/BookingHero";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/tournament-booking/:id",
        element: (
          <PrivateRoute>
            <TournamentBooking></TournamentBooking>
          </PrivateRoute>
        ),
      },
      {
        path: "/registration-form/:id",
        element: (
          <PrivateRoute>
            <RegistrationForm></RegistrationForm>
          </PrivateRoute>
        ),
      },
      {
        path: "/booking",
        element: (
          <PrivateRoute>
            <BookingHero></BookingHero>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/review",
        element: <Review></Review>,
      },
      {
        path: "/leaderBoard",
        element: <LeaderBoard></LeaderBoard>,
      },
      {
        path: "/turf/:id",
        element: <TurfDetails></TurfDetails>,
      },
      {
        path: "/dashboard/payment/success",
        element: <PaymentSuccess></PaymentSuccess>,
      },
      {
        path: "/dashboard/tournament/payment/success",
        element: <TournamentPayment></TournamentPayment>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoardLayout></DashBoardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/dashboard/turfUpdate/:id",
        element: <TurfUpdates></TurfUpdates>,
      },
      {
        path: "/dashboard/leaderBoard",
        element: <LeaderBoard></LeaderBoard>,
      },
      {
        path: "/dashboard/history",
        element: <PayHistory></PayHistory>,
      },
      {
        path: "/dashboard/userHome",
        element: <UserHome></UserHome>,
      },
      {
        path: "/dashboard/ownerHome",
        element: <OwnerHome></OwnerHome>,
      },
      {
        path: "/dashboard/adminHome",
        element: <AdminHome></AdminHome>,
      },

      {
        path: "/dashboard/myProfile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "/dashboard/OwnerTurfData",
        element: <OwnerTurfData/>,
      },

      {
        path: "/dashboard/allTurfs",
        element: <AllTurfs></AllTurfs>,
      },
      {
        path: "/dashboard/addTournament",
        element: <TournamentForm></TournamentForm>,
      },
      {
        path: "/dashboard/addTurf",
        element: <AddTurf></AddTurf>,
      },
      {
        path: "/dashboard/usermybookings",
        element: <UserMyBooking></UserMyBooking>,
      },
      {
        path: "/dashboard/ownerbookings",
        element: <AdminBooking></AdminBooking>,
      },
      {
        path: "/dashboard/payment/:id",
        element: <Payment></Payment>,
      },
      {
        path: "/dashboard/allUsers",
        element: (
          <SuperAdminRoute>
            <AllUsers></AllUsers>
          </SuperAdminRoute>
        ),
      },
      {
        path: "/dashboard/allAdmin",
        element: (
          <SuperAdminRoute>
            <AllAdmin></AllAdmin>
          </SuperAdminRoute>
        ),
      },
      {
        path: "/dashboard/allUsers",
        element: <AllUsers></AllUsers>,
      },
      {
        path: "/dashboard/allAdmin",
        element: <AllAdmin></AllAdmin>,
      },
      {
        path: "/dashboard/allBookings",
        element: (
          <SuperAdminRoute>
            <AllBookings></AllBookings>
          </SuperAdminRoute>
        ),
      },
    ],
  },
]);

export default router;
