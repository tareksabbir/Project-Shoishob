import { createBrowserRouter } from "react-router-dom";
import Main from "../Layoute/main";
import Home from "../page/Home/Home";
import About from "../page/About/About";

import BookingRoutes from "../page/Booking/BookingRoutes";
import Contact from "../page/Contact/Contact";
import Login from "../page/Login/Login";
import SignUp from "../page/SignUp/SignUp";
import Review from "../page/Review/Review";
import Dashboard from "../page/Dashboard/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import DashBoardLayout from "../Layoute/DashBoardLayout";
import MyBookings from "../page/Dashboard/MyBookings/MyBookings";
import TurfDetails from "../page/TurfDetails/TurfDetails";
import AllUsers from "../page/Dashboard/AllUsers/AllUsers";
import AllAdmin from "../page/Dashboard/AlllAdmin/AllAdmin";

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
        path: "/booking",
        element: (
          <PrivateRoute>
            <BookingRoutes></BookingRoutes>
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
        path: "/turf/:id",
        element: <TurfDetails></TurfDetails>,
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
        path: "/dashboard/mybookings",
        element: <MyBookings></MyBookings>,
      },
      {
        path: "/dashboard/allUsers",
        element: <AllUsers></AllUsers>,
      },
      {
        path: "/dashboard/allAdmin",
        element: <AllAdmin></AllAdmin>,
      },
    ],
  },
]);

export default router;
