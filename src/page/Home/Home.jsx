import PlayZone from "./PlayZone";
import Turf from "./Turf";
import Bannar from "./bannar";
import Heading from "./heading";
import Featured from "./Featured";
import EmailCollect from "./EmailCollect";

export default function Home() {
  return (
    <>
      <Bannar />
      <Turf></Turf>
      <Featured></Featured>
      <Heading />
      <PlayZone />
      <EmailCollect></EmailCollect>
    </>
  );
}
