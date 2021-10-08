import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { selectUser, handleLogin } from "../../../features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { auth, db, provider } from "../../../firebase";
import { signInWithPopup } from "firebase/auth";
import GoogleIcon from "@mui/icons-material/Google";

import "../styles/Login.css";

const Login = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();
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
