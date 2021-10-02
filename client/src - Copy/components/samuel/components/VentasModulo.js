import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { selectUser } from "../../../features/userSlice";
import { selectProducts } from "../../../features/productSlice";
import { useSelector } from "react-redux";
// import { v4 as uuidv4 } from "uuid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import "../styles/VentasModulo.css";

// const options = [
//   "Show some love to MUI",
//   "Show all notification content",
//   "Hide sensitive notification content",
//   "Hide all notification content",
// ];

const VentasModulo = () => {
  const user = useSelector(selectUser);
  const products = useSelector(selectProducts);
  const [options, setOptions] = useState([]);
  const [rows, setRows] = useState([]);
  const [isEditing, setIsEditing] = useState({ state: false, id: "" });
  const [newProduct, setNewProduct] = useState({
    quantity: "",
    idClient: "",
    nameClient: "",
  });
  useEffect(() => {
    setOptions(products);
  },[products]);
  const [searchData, setSearchData] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [nameProduct, setNameProduct] = useState("");
  const [valueUnit, setValueUnit] = useState(null);
  const [idProduct, setIdProduct] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState("");
  const open = Boolean(anchorEl);

  const handleNewProduct = () => {
    const { quantity, idClient, nameClient } = newProduct;
    setRows([
      {
        nameProduct,
        valueUnit,
        quantity,
        idClient,
        nameClient,
        id: idProduct,
        total: parseInt(valueUnit) * parseInt(newProduct.quantity),
        date: JSON.stringify(new Date()).replace("T", ",").slice(1, 17),
        nameSeller: user.name,
      },
      ...rows,
    ]);
    setSelectedIndex(null);
    setNameProduct("");
    setNewProduct({
      quantity: "",
      idClient: "",
      nameClient: "",
    });
  };
  const handleUpdateProduct = () => {
    const oldData = [...rows];
    const newData = oldData.filter((row) => {
      if (row.id === isEditing.id) {
        row.nameProduct = nameProduct;
        row.valueUnit = valueUnit;
        row.total = parseInt(valueUnit) * parseInt(newProduct.quantity);
        row.quantity = newProduct.quantity;
        row.idClient = newProduct.idClient;
        row.nameClient = newProduct.nameClient;
      }
      return row;
    });
    setRows(newData);
    setSelectedIndex(null);
    setNameProduct("");
    setNewProduct({
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
      setSelectedIndex(options.indexOf(row.id));
      setNameProduct(row.nameProduct);
      setValueUnit(row.valueUnit);
      setNewProduct({
        quantity: row.quantity,
        idClient: row.idClient,
        nameClient: row.nameClient,
      });
    } else {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const handleMenuItemClick = (index) => {
    setSelectedIndex(index);
    setNameProduct(options[index].description);
    setValueUnit(options[index].price);
    setIdProduct(options[index].idProduct);
    setAnchorEl(null);
  };
  
  return (
    <div className="ventasModulo">
      <div className="ventasModulo__left">
        <div>
          <List
            component="nav"
            aria-label="Device settings"
            sx={{ bgcolor: "background.paper" }}
          >
            <ListItem
              button
              id="lock-button"
              aria-haspopup="listbox"
              aria-controls="lock-menu"
              aria-expanded={open ? "true" : undefined}
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              <ListItemText primary={nameProduct || "Select option"} />
              <KeyboardArrowDownIcon />
            </ListItem>
          </List>
          <Menu
            id="lock-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
            MenuListProps={{
              "aria-labelledby": "lock-button",
              role: "listbox",
            }}
          >
            {options.map((option, index) => (
              <MenuItem
                key={option.description}
                selected={index === selectedIndex}
                onClick={() => handleMenuItemClick(index)}
              >
                {option.description}
              </MenuItem>
            ))}
          </Menu>
        </div>
        <h2>Precio: {valueUnit}</h2>
        {/* <TextField
          disabled
          value={valueUnit}
          // label="Valor del producto"
          variant="standard"
        /> */}
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
                .map((row,index) => (
                  <TableRow key={index} onClick={() => handleRow(row.id)}>
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
