import React from "react";
import { Button } from "@mui/material";
import { useHistory } from "react-router";

const UsuarioSinPermisos = () => {
  const history = useHistory();
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      No tienes permisos para ver esta página
      <Button
        variant="contained"
        color="success"
        sx={{ marginTop: "10px" }}
        onClick={() => history.push("/")}
      >
        Go Home
      </Button>
    </div>
  );
};

export default UsuarioSinPermisos;
