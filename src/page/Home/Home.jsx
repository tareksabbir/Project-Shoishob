import Turf from "./Turf";
import Bannar from "./Bannar";
import Heading from "./heading";
import Featured from "./Featured";
import EmailCollect from "./EmailCollect";

export default function Home() {
  return (
    <>
      <Bannar></Bannar>
      <Turf></Turf>
      <Featured></Featured>
      <Heading />
      <EmailCollect></EmailCollect>
    </>
  );
}
