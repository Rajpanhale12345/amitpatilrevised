import { useState, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const sections = [{ id: "contact", label: "Contact" }];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setOpen(false);
    }
  };

  return (
    <>
      <header className="hb-header">
        {/* Left side - logo / brand */}
        <div className="hb-logo">
         
        </div>

        {/* Desktop nav links */}
        <nav className="hb-nav-links">
          <Link to="/">
            <button className="hb-btn" style={{backgroundColor:"black"}}>
              <b style={{color : "white", backgroundColor : "black"}}>Home</b>
            </button>
          </Link>
          <Link to="/clients">
            <button className="hb-btn" style={{backgroundColor:"black"}}>
              <b style={{color : "white", backgroundColor : "black"}}>Clients</b>
            </button>
          </Link>
          <Link to="/services">
            <button className="hb-btn" style={{backgroundColor:"black"}}>
              <b style={{color : "white", backgroundColor : "black"}}>Services</b>
            </button>
          </Link>
          
          <a href="tel:9156785678">
            <button className="hb-btn hb-call-btn" style={{backgroundColor:"black"}}>
              <b style={{color : "white", backgroundColor : "black"}}>Arrange a Call</b>
            </button>
          </a>
        </nav>

        {/* Hamburger (visible on mobile) */}
        <button
          className={`hamburger ${open ? "is-active" : ""}`}
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {/* Fullscreen overlay for mobile menu */}
      <div className={`menu-overlay ${open ? "show" : ""}`}>
        <ul className="overlay-list">
          <li>
            <Link to="/" onClick={() => setOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/clients" onClick={() => setOpen(false)}>
              Clients
            </Link>
          </li>
          <li>
            <Link to="/services" onClick={() => setOpen(false)}>
              Services
            </Link>
          </li>
         
          <li>
            <a href="tel:9156785678" onClick={() => setOpen(false)}>
              Arrange a Call
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
