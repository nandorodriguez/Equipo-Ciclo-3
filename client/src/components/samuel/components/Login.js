import React from "react";
import Button from "@mui/material/Button";
import { handleLogin } from "../../../features/userSlice";
import { useDispatch } from "react-redux";
import { auth, provider } from "../../../firebase";
import { signInWithPopup } from "firebase/auth";
import GoogleIcon from "@mui/icons-material/Google";
import "../styles/Login.css";
const Login = () => {
  const dispatch = useDispatch();
  const handleSignIn = async () => {
    await signInWithPopup(auth, provider).then(({ user }) => {
      dispatch(
        handleLogin({
          id: user.uid,
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        })
      );
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
