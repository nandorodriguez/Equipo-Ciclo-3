import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/samuel/components/Login";
import Dashboard from "./components/samuel/components/Dashboard";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, handleLogout } from "./features/userSlice";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  return (
    <Router>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
