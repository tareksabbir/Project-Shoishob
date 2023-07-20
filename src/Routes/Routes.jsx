import { createBrowserRouter } from "react-router-dom";
import Main from "../Layoute/main";
import Home from "../page/Home/Home";
import About from "../page/About/About";

import BookingRoutes from "../page/Booking/BookingRoutes";
import Contact from "../page/Contac/Contact";

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
    ],
  },
]);

export default router;
