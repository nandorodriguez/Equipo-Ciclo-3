import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { selectUser } from "../../../features/userSlice";
import { useSelector } from "react-redux";
import "../styles/VentasModulo.css";

const VentasModulo = () => {
  const uri = "http://localhost:8080";
  const user = useSelector(selectUser);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [options, setOptions] = useState([]);
  const [rows, setRows] = useState([]);
  const [isEditing, setIsEditing] = useState({ state: false, id: "" });
  const [searchData, setSearchData] = useState("");
  const [nameProduct, setNameProduct] = useState("");
  const [valueUnit, setValueUnit] = useState(null);
  const [idProduct, setIdProduct] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState("");
  const [newProduct, setNewProduct] = useState({
    quantity: "",
    idClient: "",
    nameClient: "",
  });
  const fetchData = async () => {
    await axios.get(uri + "/products").then(({ data }) => setOptions(data));
    await axios.get(uri + "/ventas").then(({ data }) => setRows(data));
  };
  const handleNewProduct = async () => {
    const { quantity, idClient, nameClient } = newProduct;
    await axios
      .post(uri + "/ventas", {
        nameProduct,
        valueUnit,
        quantity,
        idClient,
        nameClient,
        id: idProduct,
        total: parseInt(valueUnit) * parseInt(newProduct.quantity),
        date: JSON.stringify(new Date()).replace("T", ",").slice(1, 17),
        nameSeller: user.name,
      })
      .then(({ data }) => setRows(data))
      .catch((e) => console.error(e));
    setSelectedIndex(null);
    setNameProduct("");
    setValueUnit(null);
    setNewProduct({
      quantity: "",
      idClient: "",
      nameClient: "",
    });
  };
  const handleUpdateProduct = async () => {
    await axios
      .put(uri + `/ventas/${isEditing.id}`, {
        nameProduct: nameProduct,
        valueUnit: valueUnit,
        total: parseInt(valueUnit) * parseInt(newProduct.quantity),
        quantity: newProduct.quantity,
        idClient: newProduct.idClient,
        nameClient: newProduct.nameClient,
      })
      .then(({data}) => setRows(data))
      .catch((e) => console.error(e));
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
  const handleEditRow = async (id) => {
    if (window.confirm("Are you sure you want to edit this purchase?")) {
      const row = rows.find((row) => row._id === id);
      setIsEditing({ ...isEditing, state: true, id: id });
      setSelectedIndex(options.indexOf(row.id));
      setNameProduct(row.nameProduct);
      setValueUnit(row.valueUnit);
      setNewProduct({
        quantity: row.quantity,
        idClient: row.idClient,
        nameClient: row.nameClient,
      });
    }
  };
  const handleDeleteRow = async (id) => {
    if (window.confirm("Are you sure you want to delete this purchase?")) {
      await axios
        .delete(uri + "/ventas", { data: { _id: id } })
        .then(({ data }) => setRows(data));
    }
  };
  const handleMenuItemClick = (index) => {
    setSelectedIndex(index);
    setNameProduct(options[index].description);
    setValueUnit(options[index].price);
    setIdProduct(options[index].idProduct);
    setAnchorEl(null);
  };
  useEffect(() => {
    fetchData();
  }, []);

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
        <h5>Price: {valueUnit}</h5>
        <TextField
          name="quantity"
          value={newProduct.quantity}
          label="Quantity"
          onChange={(e) => handleOnChange(e)}
          variant="standard"
        />
        <TextField
          name="idClient"
          value={newProduct.idClient}
          label="Client ID"
          onChange={(e) => handleOnChange(e)}
          variant="standard"
        />
        <TextField
          name="nameClient"
          value={newProduct.nameClient}
          label="Client name"
          onChange={(e) => handleOnChange(e)}
          variant="standard"
        />
        {!isEditing.state ? (
          <Button
            variant="contained"
            color="success"
            onClick={() => handleNewProduct()}
          >
            Sell
          </Button>
        ) : (
          <Button variant="contained" onClick={() => handleUpdateProduct()}>
            Update
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
        <TableContainer style={{overflowY:"scroll"}} component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <strong>ID</strong>
                </TableCell>
                <TableCell>
                  <strong>Product</strong>
                </TableCell>
                <TableCell>
                  <strong>Unit Value</strong>
                </TableCell>
                <TableCell>
                  <strong>Quantity</strong>
                </TableCell>
                <TableCell>
                  <strong>Total</strong>
                </TableCell>
                <TableCell>
                  <strong>Date</strong>
                </TableCell>
                <TableCell>
                  <strong>Client ID</strong>
                </TableCell>
                <TableCell>
                  <strong>Client Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Seller Name</strong>
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
                  <TableRow key={row._id}>
                    <>
                      <TableCell>
                        <IconButton onClick={() => handleDeleteRow(row._id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>

                      <TableCell>
                        <IconButton onClick={() => handleEditRow(row._id)}>
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                    </>
                    <TableCell>{row._id}</TableCell>
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
