import React, { useState } from "react";

import "../styles/Dashboard.css";
import Producto from "../../fernandoZuky/Producto";
import Usuarios from "../../edierYilmar/components/Usuarios";
import VentasModulo from "./VentasModulo";
import Home from "./Home";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <Router>
      <div className="dashboard">
        <nav style={{ zIndex: "50" }}>
          <ul className="lista__links">
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
        <Switch>
          <Route path="/ventas">
            <VentasModulo />
          </Route>
          <Route path="/admin">
            <Producto />
          </Route>
          <Route path="/usuarios">
            <Usuarios />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default Dashboard;
