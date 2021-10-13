import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/samuel/components/Login";
import Dashboard from "./components/samuel/components/Dashboard";
import { handleLogin, selectUser } from "./features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import { auth } from "./firebase";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          handleLogin({
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
          })
        );
      }
    });
  }, []);
  return <div className="App">{user ? <Dashboard /> : <Login />}</div>;
}

export default App;
