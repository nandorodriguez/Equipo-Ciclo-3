import React, { useState, useEffect } from "react";
import { TextField, Table, TableContainer, Paper,FormControlLabel,Radio,RadioGroup} from "@mui/material";
import Button from "@mui/material/Button";
import "../styles/Usuarios.css";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";

const UsuarioForm = ({
  newUser,
  handleOnChange,
  handleNewUser,
  handleUpdateUser,
  isEditing,
  setNewUser,
}) => {
  
  return (
    <>

      <h1 style={{ textAlign: "center", marginBottom: "40px" }}>Users</h1>
      <TextField
        disabled={isEditing.state ? true : false}
        name="nombre"
        value={newUser.nombre}
        label="Nombre del Usuario"
        onChange={(e) => handleOnChange(e)}
        variant="standard"
      />
      <TextField
        disabled={isEditing.state ? true : false}
        name="apellido"
        value={newUser.apellido}
        label="Apellidos"
        onChange={(e) => handleOnChange(e)}
        variant="standard"
      />
      <RadioGroup aria-label="position" value={newUser.role} onChange={e => setNewUser({...newUser,role: e.target.value})}>     
        <FormControlLabel value="admin" control={<Radio />} label="Admin" />
        <FormControlLabel value="user" control={<Radio />} label="User" />
      </RadioGroup>
      {/* <TextField
        name="role"
        value={newUser.role}
        label="Role del Usuario"
        onChange={(e) => handleOnChange(e)}
        variant="standard"
      /> */}
      {!isEditing.state ? (
        <Button variant="contained" onClick={() => handleNewUser()}>
          Create user
        </Button>
      ) : (
        <Button
          variant="contained"
          color="success"
          onClick={() => handleUpdateUser()}
        >
          Update user
        </Button>
      )}
    </>
  );
};
export default UsuarioForm;
