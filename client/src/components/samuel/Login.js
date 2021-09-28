import React, {useState} from "react";
import GoogleIcon from "@mui/icons-material/Google";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { handleLogin } from "../../features/userSlice";
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([
    {
      id: "1",
      name: "samuel ceron",
      email: "est.wilder.taborda@unimilitar.edu.co",
      role: "usuario",
    },
    {
      id: "2",
      name: "andres",
      email: "andres@gmail.com",
      role: "vendedor",
    },
    {
      id: "3",
      name: "perro",
      email: "perro@gmail.com",
      role: "admin",
    },
  ]);
  return (
    <div className="login">
      <Button
        variant="contained"
        color="error"
        startIcon={<GoogleIcon />}
        onClick={() =>
          dispatch(
            handleLogin(users[0])
          )
        }
      >
        usuario
      </Button>
      <Button
        variant="contained"
        color="error"
        startIcon={<GoogleIcon />}
        onClick={() =>
          dispatch(
            handleLogin(users[1])
          )
        }
      >
        vendedor
      </Button>
      <Button
        variant="contained"
        color="error"
        startIcon={<GoogleIcon />}
        onClick={() =>
          dispatch(
            handleLogin(users[2])
          )
        }
      >
        admin
      </Button>
    </div>
  );
};

export default Login;
