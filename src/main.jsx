import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
// import { RouterProvider } from "react-router-dom";
// import routes from "./routes/index.jsX";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <RouterProvider router={routes} /> */}
    <BrowserRouter>
        <App />
      </BrowserRouter>
  </React.StrictMode>
);
