import React from "react";
import { Button, TextField } from "@mui/material";
import "../styles/VentasModulo.css";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Grid3x3Icon from "@mui/icons-material/Grid3x3";
import SellIcon from "@mui/icons-material/Sell";
import AutorenewIcon from "@mui/icons-material/Autorenew";
const VentasModuloForm = ({
  handleNewProduct,
  handleOnChange,
  handleUpdateProduct,
  isEditing,
  valueUnit,
  newProduct,
}) => {
  return (
    <>
      <h5>Price: {valueUnit ? `${valueUnit} pesos` : "0 pesos"}</h5>
      <TextField
        type="number"
        name="quantity"
        value={newProduct.quantity}
        label="Quantity"
        onChange={(e) => handleOnChange(e)}
        variant="standard"
      />
      <TextField
        name="idClient"
        onChange={(e) => handleOnChange(e)}
        value={newProduct.idClient}
        label="Client ID"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Grid3x3Icon />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
      <TextField
        name="nameClient"
        onChange={(e) => handleOnChange(e)}
        value={newProduct.nameClient}
        label="Client name"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
      {!isEditing.state ? (
        <Button
          variant="contained"
          color="success"
          startIcon={<SellIcon />}
          onClick={() => handleNewProduct()}
        >
          Sell
        </Button>
      ) : (
        <Button
          color="secondary"
          variant="contained"
          startIcon={<AutorenewIcon />}
          onClick={() => handleUpdateProduct()}
        >
          Update
        </Button>
      )}
    </>
  );
};

export default VentasModuloForm;
