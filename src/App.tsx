import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Issues from "./pages/Issues";
import Submit from "./pages/Submit";
import Masthead from "./pages/Masthead";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/issues" element={<Issues />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/masthead" element={<Masthead />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
