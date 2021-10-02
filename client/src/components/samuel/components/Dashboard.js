import React, { useState } from "react";

import "../styles/Dashboard.css";
import Producto from "../../fernandoZuky/Producto";
import Usuarios from "../../edier/components/Usuarios";
import VentasModulo from "./VentasModulo";
import Home from "./Home";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Dashboard = () => {
  
  
  return (
    <Router>
      <div className="dashboard">

        <div style={{ position: "absolute", width: "100%", top:"0",left:"0" }}>
          <ul className="lista__links">
            <li>
              <Link to="/home">Home</Link>
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
        </div>
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
          <Route path="/home">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default Dashboard;
