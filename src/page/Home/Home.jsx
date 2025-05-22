import Turf from "./Turf";
import Bannar from "./Bannar";
import Featured from "./Featured";
import Heading from "./Heading";

export default function Home() {
  return (
    <>
      <div className="max-w-screen-2xl mx-auto px-5 md:px-10">
        <Bannar></Bannar>
        <Turf></Turf>
        <Heading />
      </div>
      <Featured></Featured>
      {/* <EmailCollect></EmailCollect> */}
    </>
  );
}
