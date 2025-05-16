import EmailCollect from "../Home/EmailCollect";
import AboutCount from "./AboutCount";
import Advantage from "./Advantage";
import Motivation from "./Motivation";
import TamMembers from "./TamMembers";

export default function About() {
  return (
    <div className="max-w-7xl mx-auto">
      <Motivation></Motivation>
      <AboutCount></AboutCount>
      <TamMembers></TamMembers>
      <Advantage></Advantage>
      <EmailCollect></EmailCollect>
    </div>
  );
}
