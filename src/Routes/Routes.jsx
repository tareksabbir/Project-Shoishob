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
        element: <BookingRoutes></BookingRoutes>,
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
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
  },
]);

export default router;
