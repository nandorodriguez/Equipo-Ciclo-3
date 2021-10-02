import React from "react";
import { auth } from "../../../firebase";
import { handleLogin } from "../../../features/userSlice";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        dispatch(handleLogin());
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Button
          variant="contained"
          color="success"
          onClick={() => {
            handleSignOut();
          }}
        >
          logout
        </Button>
    </div>
  );
};

export default Home;
