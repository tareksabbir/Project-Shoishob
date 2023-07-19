import { Route, Routes } from "react-router-dom";
import Home from "./page/Home/Home";
import About from "./page/About/About";
import Contact from "./page/Contac/contact";
import Practice from "./page/pactice/practice";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/contact" element={<Contact></Contact>}></Route>
        <Route path="/practice" element={<Practice></Practice>}></Route>
      </Routes>
    </>
  );
}

export default App;
