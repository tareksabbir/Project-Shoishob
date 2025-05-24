import Turf from "./Turf";
import Bannar from "./Bannar";
import Featured from "./Featured";
import EmailCollect from "./EmailCollect";
import Heading from "./Heading";

export default function Home() {
  return (
    <>
      <div className="px-5 md:px-10">
        <Bannar></Bannar>
        <Turf></Turf>
        <Heading />

        <Featured></Featured>
        <EmailCollect></EmailCollect>
      </div>
    </>
  );
}
