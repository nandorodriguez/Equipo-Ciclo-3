import React, { useState, useEffect } from "react";
import {
  TextField,
  Table,
  TableContainer,
  Paper,
  Button,
  Modal,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import VentasTablaHeader from "./VentasTablaHeader";
import VentasTablaBody from "./VentasTablaBody";
import BarChartIcon from "@mui/icons-material/BarChart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
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
  const [open, setOpen] = useState(false);
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
      <div
        style={{
          display: "flex",
          margin: "15px",
          width: "90%",
          justifyContent: "space-between",
        }}
      >
        <TextField
          style={{ marginRight: "10px" }}
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
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => setOpen(true)}
          startIcon={<BarChartIcon />}
        >
          Get chart
        </Button>
        <Modal
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
          open={open}
          onClose={() => setOpen(false)}
        >
          <div
            style={{
              padding: "20px",
              backgroundColor: "#fff",
              width: "50%",
              height: "70%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LineChart width={900} height={600} data={rows}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="total" stroke="#f00" />
            </LineChart>
          </div>
        </Modal>
      </div>
      <TableContainer
        style={{
          overflowY: "scroll",
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
