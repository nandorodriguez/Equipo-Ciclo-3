import React, { useState } from "react";
import "./App.css";
import Login from "./components/samuel/Login";
import Producto from "./components/fernandoZuky/Producto";
import Usuarios from "./components/yilmar/usuarios";
import VentasModulo from "./components/samuel/VentasModulo";
import { useSelector, useDispatch } from "react-redux";
import { selectUser,handleLogin } from "./features/userSlice";

function App() {
  return (
    <div className="App">
      <Login />
      <VentasModulo />
      <Producto />
      <Usuarios />
    </div>
  );
}

export default App;
