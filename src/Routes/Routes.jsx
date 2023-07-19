import { createBrowserRouter } from "react-router-dom";
import Main from "../Layoute/main";
import Home from "../page/Home/Home";
import About from "../page/About/About";
import Contact from "../page/Contac/contact";

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
    ],
  },
]);

export default router;
