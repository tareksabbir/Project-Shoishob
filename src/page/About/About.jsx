import Navbar from "../../shared/navbar";
import Footer from "../Footer/Footer";
import EmailCollect from "../Home/EmailCollect";

import AboutCount from "./AboutCount";
import Advantage from "./Advantage";
import Motivation from "./Motivation";
import TamMembers from "./TamMembers";

export default function About() {
  return (
    <>
      <Navbar></Navbar>
      <Motivation></Motivation>
      <AboutCount></AboutCount>
      <TamMembers></TamMembers>
      <Advantage></Advantage>
      <EmailCollect></EmailCollect>
      <Footer></Footer>
    </>
  );
}
