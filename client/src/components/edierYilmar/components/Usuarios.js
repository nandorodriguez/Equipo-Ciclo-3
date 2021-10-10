import React, { useState, useEffect } from "react";
import { TextField, Switch } from "@mui/material";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Fade } from "react-reveal";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import "../styles/Usuarios.css";
const Usuarios = () => {
  const uri = "http://localhost:8080/usuarios";
  const [searchData, setSearchData] = useState("");
  const [rows, setRows] = useState([]);
  const [isEditing, setIsEditing] = useState({ state: false, id: "" });
  const [newUser, setNewUser] = useState({
    nombre: "",
    apellido: "",
    role: "",
    estado: "",
  });
  const handleNewUser = async () => {
    const userExist = rows.find(
      (user) =>
        user.nombre === newUser.nombre && user.apellido === newUser.apellido
    );
    if (userExist) {
      alert("The user has been already created");
      setNewUser({
        nombre: "",
        apellido: "",
        role: "",
        estado: "",
      });
    } else {
      await axios
        .post(uri, { ...newUser, estado: "Inactive", idGoogle: uuidv4() })
        .then(({ data }) => setRows(data))
        .catch((e) => console.error(e));
      setNewUser({
        nombre: "",
        apellido: "",
        role: "",
        estado: "",
      });
    }
  };
  const handleUpdateUser = async () => {
    const userToUpdateExist = rows.find(
      (user) =>
        user.nombre === newUser.nombre &&
        user.apellido === newUser.apellido &&
        user._id !== isEditing.id
    );
    if (userToUpdateExist) {
      alert("The user already exist");
      setNewUser({
        nombre: "",
        apellido: "",
        role: "",
        estado: "",
      });
    } else {
      await axios
        .put(uri + `/${isEditing.id}`, {
          nombre: newUser.nombre,
          apellido: newUser.apellido,
          role: newUser.role,
          estado: newUser.estado,
        })
        .then(({ data }) => setRows(data))
        .catch((e) => console.error(e));
      setNewUser({
        nombre: "",
        apellido: "",
        role: "",
        estado: "",
      });
    }
    setIsEditing({ ...isEditing, state: false, id: "" });
  };
  const handleOnChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
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
  const handleRow = async (id) => {
    const option = window.confirm(
      "Ok: Editar registro \nCancel: Borrar registro"
    );
    const row = rows.find((row) => row._id === id);
    if (option) {
      setIsEditing({ ...isEditing, state: true, id: id });
      setNewUser({
        nombre: row.nombre,
        apellido: row.apellido,
        role: row.role,
        estado: row.estado,
      });
    } else {
      await axios
        .delete(uri, { data: { _id: id } })
        .then(({ data }) => setRows(data));
    }
  };
  const fetchData = async () => {
    await axios.get(uri).then(({ data }) => setRows(data));
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="fondo_usuario">
      <Fade bottom>
        <div className="usuario__left">
          <TextField
            name="nombre"
            value={newUser.nombre}
            label="Nombre del Usuario"
            onChange={(e) => handleOnChange(e)}
            variant="standard"
          />
          <TextField
            name="apellido"
            value={newUser.apellido}
            label="Apellidos"
            onChange={(e) => handleOnChange(e)}
            variant="standard"
          />
          <TextField
            name="role"
            value={newUser.role}
            label="Role del Usuario"
            onChange={(e) => handleOnChange(e)}
            variant="standard"
          />
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
        </div>
      </Fade>
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
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>
                    <strong>First Name</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Last Name</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Role</strong>
                  </TableCell>
                  <TableCell>
                    <strong>State</strong>
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
                      <TableCell>
                        <button onClick={() => handleRow(row._id)}>
                          handle user
                        </button>
                      </TableCell>
                      <TableCell>{row.nombre}</TableCell>
                      <TableCell>{row.apellido}</TableCell>
                      <TableCell>{row.role}</TableCell>
                      <TableCell>
                        <Switch
                          checked={row.estado !== "Inactive" ? true : false}
                          onChange={() => handleUpdateStateUser(row._id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Fade>
    </div>
  );
};

export default Usuarios;
