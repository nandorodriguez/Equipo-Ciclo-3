import React, { useState, useEffect } from "react";
import {
  TextField,
  Table,
  TableContainer,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import VentasTablaHeader from "./VentasTablaHeader";
import VentasTablaBody from "./VentasTablaBody";
import axios from "axios";

const VentasTabla = ({
  rows,
  setRows,
  isEditing,
  setIsEditing,
  setNewProduct,
  setSelectedIndex,
  options,
  setOptions,
  setNameProduct,
  setValueUnit,
}) => {
  const [searchData, setSearchData] = useState("");
  const uri = "http://localhost:8080";
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
  const fetchData = async () => {
    await axios.get(uri + "/products").then(({ data }) => setOptions(data));
    await axios.get(uri + "/ventas").then(({ data }) => setRows(data));
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <TextField
        style={{ width: "40%", marginBottom: "20px" }}
        onChange={(e) => setSearchData(e.target.value)}
        label="Search"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
      <TableContainer
        style={{
          overflowY: "scroll",
          border: "1px solid black",
        }}
        component={Paper}
      >
        <Table stickyHeader>
          <VentasTablaHeader />
          <VentasTablaBody
            rows={rows}
            searchData={searchData}
            handleDeleteRow={handleDeleteRow}
            handleEditRow={handleEditRow}
          />
        </Table>
      </TableContainer>
    </>
  );
};

export default VentasTabla;
