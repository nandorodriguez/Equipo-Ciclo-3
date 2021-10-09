import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "../styles/NavBar.css";
const NavBar = () => {
  const [showNav, setShowNav] = useState(false);

  const transitionNav = () => {
    setShowNav(window.scrollY > 100 ? true : false);
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNav);
    return () => {
      window.removeEventListener("scroll", transitionNav);
    };
  }, []);
  return (
    <nav style={{ zIndex: "50" }}>
      <ul className={`lista__links ${showNav && "lista__links--black"}`}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/ventas">Vendedor</Link>
        </li>
        <li>
          <Link to="/admin">Administrador</Link>
        </li>
        <li>
          <Link to="/usuarios">Usuarios</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
