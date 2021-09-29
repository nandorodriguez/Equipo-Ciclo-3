import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/samuel/components/Login";
import Producto from "./components/fernandoZuky/Producto";
import Usuarios from "./components/yilmar/usuarios";
import VentasModulo from "./components/samuel/components/VentasModulo";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, handleLogout } from "./features/userSlice";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/ventas">Vendedor</Link>
            </li>
            <li>
              <Link to="/admin">Administrador</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/ventas">
            <VentasModulo />
          </Route>
          <Route path="/admin">
            <Producto />
<<<<<<< HEAD
            <button onClick={() => dispatch(handleLogout)}>log out</button>
          </>
        );
      case "vendedor":
        return <VentasModulo />;
      case "admin":
        break;
      default:
        break;
    }
  }
  return <Login />;
=======
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
>>>>>>> 1ecaa21c635a9f2e98b447ac79f99cf8e039b981
}

export default App;
