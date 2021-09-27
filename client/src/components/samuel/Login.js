import React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import Button from "@mui/material/Button";
import "./Login.css";

export default function ColorButtons() {
  return (
    <div className="login">
      <Button
        className="login__btn"
        variant="contained"
        color="error"
        startIcon={<GoogleIcon />}
      >
        Google
      </Button>
    </div>
  );
}
