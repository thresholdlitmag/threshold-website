import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import WorkPage from "./pages/WorkPage";
import EDesign from "./pages/EDesign";
import Shadwell from "./pages/Shadwell";
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
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/:id" element={<WorkPage />} />
          <Route path="/e-design" element={<EDesign />} />
          <Route path="/shadwell" element={<Shadwell />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/masthead" element={<Masthead />} />
          <Route path="/contact" element={<Contact />} />
          {/* Old URL kept alive for anyone with a saved link */}
          <Route path="/issues" element={<Navigate to="/gallery" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
