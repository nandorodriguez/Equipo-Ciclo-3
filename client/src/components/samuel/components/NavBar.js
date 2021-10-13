import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../../../features/userSlice";
import LogoutIcon from "@mui/icons-material/Logout";
import { auth } from "../../../firebase";
import { handleLogin } from "../../../features/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import "../styles/NavBar.css";
const NavBar = () => {
  const uri = "http://localhost:8080/usuarios";
  const user = useSelector(selectUser);
  const history = useHistory();
  const [typeOfUser, setTypeOfUser] = useState({ type: "", status: "" });
  const dispatch = useDispatch();
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        dispatch(handleLogin());
      })
      .catch((err) => console.log(err));
  };
  const getUsers = async () => {
    await axios.get(uri).then(({ data }) => {
      const userActual = data.find((userFind) => userFind.idGoogle === user.id);
      if (userActual) {
        if (userActual.role === "admin" && userActual.estado === "Active") {
          setTypeOfUser({ ...typeOfUser, type: "admin", status: "active" });
        }
        if (userActual.role === "user" && userActual.estado === "Active") {
          setTypeOfUser({ ...typeOfUser, type: "user", status: "active" });
        }
        if (userActual.role === "user" && userActual.estado === "Inactive") {
          setTypeOfUser({ ...typeOfUser, type: "user", status: "inactive" });
        }
      }
    });
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="nav">
      <div style={{ width: "300px", justifyContent: "end" }}>
        <ul className="nav__links">
          <li>
            <Link to="/">Home</Link>
          </li>

          {typeOfUser.status === "active" && (
            <li>
              <Link to="/ventas">Seller</Link>
            </li>
          )}
          {typeOfUser.type === "admin" && typeOfUser.status === "active" && (
            <>
              <li>
                <Link to="/admin">Admin</Link>
              </li>
              <li>
                <Link to="/usuarios">Users</Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <Avatar
        alt={user.name}
        src={user.photo}
        style={{ cursor: "pointer" }}
        onClick={() => history.push("/")}
      />
      <div style={{ width: "300px", textAlign: "right" }}>
        <Button
          color="error"
          variant="outlined"
          startIcon={<LogoutIcon />}
          onClick={() => handleSignOut()}
        >
          log out
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
