import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Clients from "./Clients";
import Services from "./Services";
const API = import.meta.env.VITE_API_BASE;
import "./App.css"
import Contact from "./Contact";

import Navbar from "./Navbar";
import Home from "./Home";

export default function App() {
 
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/clients" element={<Clients />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  
     <h5 style={{textAlign : "center"}}> © 2025 <Link to="https://brandbanao.ai">BrandBanao.Ai</Link>. All Rights Reserved.</h5>
    </>
  );
}
