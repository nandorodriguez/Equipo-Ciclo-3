import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";
import "./VentasModulo.css";

const VentasModulo = () => {
  const user = useSelector(selectUser);
  const [rows, setRows] = useState([]);
  const [newProduct, setNewProduct] = useState({
    nameProduct: "",
    valueUnit: "",
    quantity: "",
    idClient: "",
    nameClient: "",
  });
  const handleNewProduct = () => {
    console.log({
      ...newProduct,
      id: rows.length + 1,
      total: parseInt(newProduct.valueUnit) * parseInt(newProduct.quantity),
      date: new Date(),
      nameSeller: user.name,
    });
    setNewProduct({
      ...newProduct,
      id: rows.length + 1,
      total: parseInt(newProduct.valueUnit) * parseInt(newProduct.quantity),
      date: JSON.stringify(new Date()),
      nameSeller: user.name,
    });
    setRows([...rows, newProduct]);
  };
  const handleOnChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };
  const handleDeleteRow = (id) => {
      setRows(rows.filter((row) => row.id !== id));
  }
  return (
    <div className="ventasModulo">
      <div className="ventasModulo__left">
        <input
          name="nameProduct"
          type="text"
          value={newProduct.nameProduct}
          placeholder="Nombre del producto"
          onChange={(e) => handleOnChange(e)}
        />
        <input
          name="valueUnit"
          type="text"
          value={newProduct.valueUnit}
          placeholder="Valor del producto"
          onChange={(e) => handleOnChange(e)}
        />
        <input
          name="quantity"
          type="text"
          value={newProduct.quantity}
          placeholder="Cantidad"
          onChange={(e) => handleOnChange(e)}
        />
        <input
          name="idClient"
          type="text"
          value={newProduct.idClient}
          placeholder="ID del cliente"
          onChange={(e) => handleOnChange(e)}
        />
        <input
          name="nameClient"
          type="text"
          value={newProduct.nameClient}
          placeholder="Nombre del cliente"
          onChange={(e) => handleOnChange(e)}
        />
        <button onClick={() => handleNewProduct()}>Registrar datos</button>
      </div>
      <div className="ventasModulo__right">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                </TableCell>
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
              {rows.map((row) => (
                <TableRow
                  key={row.id | 0}
                  onClick={() =>
                    setNewProduct({
                      nameProduct: row.nameProduct,
                      valueUnit: row.valueUnit,
                      quantity: row.quantity,
                      idClient: row.idClient,
                      nameClient: row.nameClient,
                    })
                  }
                >
                  <button onClick={()=>handleDeleteRow()}>x</button>
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
