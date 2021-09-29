import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { selectUser } from "../../../features/userSlice";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import "../styles/VentasModulo.css";

const VentasModulo = () => {
  const user = useSelector(selectUser);
  const [rows, setRows] = useState([]);
  const [isEditing, setIsEditing] = useState({ state: false, id: "" });

  const [newProduct, setNewProduct] = useState({
    nameProduct: "",
    valueUnit: "",
    quantity: "",
    idClient: "",
    nameClient: "",
  });

  const [searchData, setSearchData] = useState("");

  const handleNewProduct = () => {
    const { nameProduct, valueUnit, quantity, idClient, nameClient } =
      newProduct;
    setRows([
      {
        nameProduct,
        valueUnit,
        quantity,
        idClient,
        nameClient,
        id: uuidv4(),
        total: parseInt(newProduct.valueUnit) * parseInt(newProduct.quantity),
        date: JSON.stringify(new Date()).replace("T", ",").slice(1, 17),
        nameSeller: user.name,
      },
      ...rows,
    ]);
    setNewProduct({
      nameProduct: "",
      valueUnit: "",
      quantity: "",
      idClient: "",
      nameClient: "",
    });
  };

  const handleUpdateProduct = () => {
    const oldData = [...rows];
    const newData = oldData.filter((row) => {
      if (row.id === isEditing.id) {
        row.nameProduct = newProduct.nameProduct;
        row.valueUnit = newProduct.valueUnit;
        row.quantity = newProduct.quantity;
        row.idClient = newProduct.idClient;
        row.nameClient = newProduct.nameClient;
      }
      return row;
    });
    setRows(newData);
    setNewProduct({
      nameProduct: "",
      valueUnit: "",
      quantity: "",
      idClient: "",
      nameClient: "",
    });
    setIsEditing({ ...isEditing, state: false, id: "" });
  };
  const handleOnChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };
  const handleRow = (id) => {
    const option = window.confirm(
      "Ok: Editar registro \nCancel: Borrar registro"
    );
    const row = rows.find((row) => row.id === id);



    if (option) {
      setIsEditing({ ...isEditing, state: true, id: id });
      setNewProduct({
        nameProduct: row.nameProduct,
        valueUnit: row.valueUnit,
        quantity: row.quantity,
        idClient: row.idClient,
        nameClient: row.nameClient,
      });
    } else {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  return (
    <div className="ventasModulo">
      <div className="ventasModulo__left">
        <TextField
          name="nameProduct"
          value={newProduct.nameProduct}
          onChange={(e) => handleOnChange(e)}
          label="Nombre del producto"
          variant="standard"
        />
        <TextField
          name="valueUnit"
          value={newProduct.valueUnit}
          label="Valor del producto"
          onChange={(e) => handleOnChange(e)}
          variant="standard"
        />
        <TextField
          name="quantity"
          value={newProduct.quantity}
          label="Cantidad"
          onChange={(e) => handleOnChange(e)}
          variant="standard"
        />
        <TextField
          name="idClient"
          value={newProduct.idClient}
          label="ID del cliente"
          onChange={(e) => handleOnChange(e)}
          variant="standard"
        />
        <TextField
          name="nameClient"
          value={newProduct.nameClient}
          label="Nombre del cliente"
          onChange={(e) => handleOnChange(e)}
          variant="standard"
        />
        {!isEditing.state ? (
          <Button variant="contained" onClick={() => handleNewProduct()}>
            Registrar datos
          </Button>
        ) : (
          <Button
            variant="contained"
            color="success"
            onClick={() => handleUpdateProduct()}
          >
            Actualizar datos
          </Button>
        )}
      </div>
      <div className="ventasModulo__right">
        <TextField
          style={{ width: "50%", marginBottom: "10px" }}
          type="text"
          label="Search"
          onChange={(e) => setSearchData(e.target.value)}
          variant="standard"
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>ID</strong>
                </TableCell>
                <TableCell>
                  <strong>Nombre Pro</strong>
                </TableCell>
                <TableCell>
                  <strong>Valor Unit</strong>
                </TableCell>
                <TableCell>
                  <strong>Cantidad</strong>
                </TableCell>
                <TableCell>
                  <strong>Total</strong>
                </TableCell>
                <TableCell>
                  <strong>Fecha</strong>
                </TableCell>
                <TableCell>
                  <strong>ID cliente</strong>
                </TableCell>
                <TableCell>
                  <strong>Nombre cli</strong>
                </TableCell>
                <TableCell>
                  <strong>Nombre vend</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .filter((row) =>
                  JSON.stringify(row)
                    .trim()
                    .toLowerCase()
                    .includes(searchData.trim().toLowerCase())
                )
                .map((row) => (
                  <TableRow key={row.id | 0} onClick={() => handleRow(row.id)}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.nameProduct}</TableCell>
                    <TableCell>{row.valueUnit}</TableCell>
                    <TableCell>{row.quantity}</TableCell>
                    <TableCell>{row.total}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.idClient}</TableCell>
                    <TableCell>{row.nameClient}</TableCell>
                    <TableCell>{row.nameSeller}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default VentasModulo;
