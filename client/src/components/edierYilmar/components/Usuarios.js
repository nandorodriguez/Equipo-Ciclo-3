import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { Fade } from "react-reveal";
import axios from "axios";
import UsuarioTablaHeader from "./UsuarioTablaHeader";
import UsuarioTablaBody from "./UsuarioTablaBody";
import UsuarioSinPermisos from "../../samuel/components/UsuarioSinPermisos";
import UsuarioForm from "./UsuarioForm";
import { useSelector } from "react-redux";
import { selectUser } from "../../../features/userSlice";
import "../styles/Usuarios.css";

const Usuarios = () => {
  const user = useSelector(selectUser);
  const uri = "http://localhost:8080/usuarios";
  const [searchData, setSearchData] = useState("");
  const [rows, setRows] = useState([]);
  const [isEditing, setIsEditing] = useState({ state: false, id: "" });
  const [typeOfUser, setTypeOfUser] = useState({ type: "", status: "" });
  const [newUser, setNewUser] = useState({
    nombre: "",
    apellido: "",
    role: "",
    estado: "",
  });
  const handleUpdateUser = async () => {
    await axios
      .put(uri + `/${isEditing.id}`, {
        nombre: newUser.nombre.trim(),
        apellido: newUser.apellido.trim(),
        role: newUser.role.trim(),
        estado: newUser.estado.trim(),
      })
      .then(({ data }) => setRows(data))
      .catch((e) => console.error(e));
    setNewUser({
      nombre: "",
      apellido: "",
      role: "",
      estado: "",
    });
    setIsEditing({ ...isEditing, state: false, id: "" });
  };
  const handleUpdateStateUser = async (id) => {
    let selectedUser = rows.find((row) => row._id === id);
    selectedUser.estado =
      selectedUser.estado === "Active" ? "Inactive" : "Active";
    const { nombre, apellido, role, estado } = selectedUser;
    await axios
      .put(uri + `/${id}`, {
        nombre: nombre,
        apellido: apellido,
        role: role,
        estado: estado,
      })
      .then(({ data }) => setRows(data))
      .catch((e) => console.error(e));
  };
  const handleEditRow = async (id) => {
    if (window.confirm("Are you sure you want to edit this User?")) {
      const row = rows.find((row) => row._id === id);
      setIsEditing({ ...isEditing, state: true, id: id });
      setNewUser({
        nombre: row.nombre,
        apellido: row.apellido,
        role: row.role,
        estado: row.estado,
      });
    }
  };
  const handleDeleteRow = async (id) => {
    if (window.confirm("Are you sure you want to delete this User?")) {
      await axios
        .delete(uri, { data: { _id: id } })
        .then(({ data }) => setRows(data));
    }
  };
  const fetchData = async () => {
    await axios.get(uri).then(({ data }) => setRows(data));
  };
  const getUsers = async () => {
    await axios.get(uri).then(({ data }) => {
      const userActual = data.find((userFind) => userFind.idGoogle === user.id);
      if (userActual) {
        if (userActual.role === "admin" && userActual.estado === "Active") {
          setTypeOfUser({ ...typeOfUser, type: "admin", status: "active" });
        }
        if (userActual.role === "admin" && userActual.estado === "Inactive") {
          setTypeOfUser({ ...typeOfUser, type: "admin", status: "inactive" });
        }
        if (userActual.role === "user" && userActual.estado === "Active") {
          setTypeOfUser({ ...typeOfUser, type: "user", status: "active" });
        }
        if (userActual.role === "user" && userActual.estado === "Inactive") {
          setTypeOfUser({ ...typeOfUser, type: "user", status: "inactive" });
        }
      }
    });
  };
  useEffect(() => {
    getUsers();
    fetchData();
  }, []);

  if (typeOfUser.type === "admin" && typeOfUser.status === "active") {
    return (
      <div className="fondo_usuario">
        {isEditing.state && (
          <Fade bottom>
            <div className="usuario__left">
              <UsuarioForm
                isEditing={isEditing}
                newUser={newUser}
                handleUpdateUser={handleUpdateUser}
                setNewUser={setNewUser}
              />
            </div>
          </Fade>
        )}
        <Fade top>
          <div className="usuario__right">
            <TextField
              style={{ width: "50%", marginBottom: "10px" }}
              type="text"
              label="Search"
              onChange={(e) => setSearchData(e.target.value)}
              variant="standard"
            />
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <UsuarioTablaHeader />
                <UsuarioTablaBody
                  rows={rows}
                  searchData={searchData}
                  handleUpdateStateUser={handleUpdateStateUser}
                  handleDeleteRow={handleDeleteRow}
                  handleEditRow={handleEditRow}
                />
              </Table>
            </TableContainer>
          </div>
        </Fade>
      </div>
    );
  }
  return <UsuarioSinPermisos />;
};

export default Usuarios;
