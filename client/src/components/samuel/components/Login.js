import React from "react";
import Button from "@mui/material/Button";
import { handleLogin } from "../../../features/userSlice";
import { useDispatch } from "react-redux";
import { auth, provider } from "../../../firebase";
import { signInWithPopup } from "firebase/auth";
import GoogleIcon from "@mui/icons-material/Google";
import axios from "axios";
import "../styles/Login.css";
const Login = () => {
  const dispatch = useDispatch();
  let usuario = {
    idGoogle: "",
    nombre: "",
    apellido: "",
    role: "",
    estado: "inactivo",
  };
  const superUsuarios = [
    {
      _id: "6164d4b80763f5dd58bff637",
      idGoogle: "IC0RhrdmcCVq5dFcLAMhdIh9a3z2",
      nombre: "Samuel",
      apellido: "Taborda",
      role: "admin",
      estado: "Active",
    },
    {
      _id: "6165ad2392776d33ace5b2f7",
      idGoogle: "SQj0EWha9lXiBWNKglFdJmrDMXJ3",
      nombre: "YILMAR",
      apellido: "GARCES",
      role: "admin",
      estado: "Active",
    },
  ];
  const handleSignIn = async () => {
    await signInWithPopup(auth, provider)
      .then(({ user }) => {
        dispatch(
          handleLogin({
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
          })
        );
        const userWithUID = superUsuarios.find(
          (superUser) => superUser.idGoogle === user.uid
        );
        if (userWithUID) {
          usuario = {
            idGoogle: userWithUID.idGoogle,
            nombre: userWithUID.nombre,
            apellido: userWithUID.apellido,
            role: userWithUID.role,
            estado: userWithUID.estado,
          };
        } else {
          usuario = {
            idGoogle: user.uid,
            nombre: user.displayName.split(" ")[0],
            apellido: user.displayName.split(" ")[1],
            role: "user",
            estado: "Inactive",
          };
        }
      })
      .then(async () => {
        await axios.post("http://localhost:8080/usuarios", usuario);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="login">
      <Button
        size="large"
        variant="contained"
        color="error"
        startIcon={<GoogleIcon />}
        onClick={() => handleSignIn()}
      >
        Login with Google
      </Button>
    </div>
  );
};

export default Login;
