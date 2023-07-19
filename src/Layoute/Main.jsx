import { Outlet } from "react-router-dom";
import Footer from "../shared/Footer";
import Navbar from "../shared/navbar";

export default function Main() {
  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
}
