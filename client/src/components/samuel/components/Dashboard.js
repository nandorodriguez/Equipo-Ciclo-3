import React from "react";
import "../styles/Dashboard.css";
import Producto from "../../fernandoZuky/Producto";
import Usuarios from "../../edierYilmar/components/Usuarios";
import VentasModulo from "./VentasModulo";
import Home from "./Home";
import NavBar from "./NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Dashboard = () => {
  return (
    <Router>
      <div className="dashboard">
        <NavBar />
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
