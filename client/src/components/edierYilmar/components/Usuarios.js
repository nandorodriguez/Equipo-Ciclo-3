import React, { useState,useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../styles/Usuarios.css";
import axios from "axios";

const Usuarios = () => {
  const uri = "http://localhost:8080/usuarios";
  const [rows, setRows] = useState([]);
  const [isEditing, setIsEditing] = useState({ state: false, id: "" });

  // con esta parte del codigo traemos los datos que existan en la base de datos
  // para listarlos en la tabla
  const fetchData = async () => {
    await axios.get(uri).then(({ data }) => setRows(data));
  };
  useEffect(() => {
    fetchData();
  }, []);

  // este codigo me sirve para guardar los datos en la base de datos
  const [newUser, setNewUser] = useState({
    nombre: "",
    apellido: "",
    role: "",
    estado: "",
  });
  const handleNewUser = async() => {
    await axios.post(uri, newUser)
      .then(({ data }) => setRows(data))
      .catch((e) => console.error(e));
    setNewUser({
      nombre: "",
      apellido: "",
      role: "",
      estado: "",
    });
  };

  // para actualizar los datos
  const [searchData, setSearchData] = useState("");
  const handleUpdateUser = () => {
    const oldData = [...rows];
    const newData = oldData.map((row) => {
      if (row.id === isEditing.id) {
        row.nombre = newUser.nombre;
        row.apellido = newUser.apellido;
        row.role = newUser.role;
        row.estado = newUser.estado;
      }
      return row;
    });
    setRows(newData);
    setNewUser({
      nombre: "",
      apellido: "",
      role: "",
      estado: "",
    });
    setIsEditing({ ...isEditing, state: false, id: "" });
  };
  const handleOnChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };
  const handleRow = async(id) => {
    const option = window.confirm(
      "Ok: Editar registro \nCancel: Borrar registro"
    );
    const row = rows.find((row) => row.id === id);
    if (option) {
      setIsEditing({ ...isEditing, state: true, id: id });
      setNewUser({
        nombre: row.nombre,
        apellido: row.apellido,
        role: row.role,
        estado: row.estado,
      });
    } else {
      //setRows(rows.filter((row) => row.id !== id));
      await axios
        .delete(uri, { data: { _id: id } })
        .then(({ data }) => setRows(data));
    }
  };
  return (
    <div className="fondo_usuario">
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
        <TextField
          name="estado"
          value={newUser.estado}
          onChange={(e) => handleOnChange(e)}
          label="Estado del Usuario"
          variant="standard"
        />

        {!isEditing.state ? (
          <Button variant="contained" onClick={() => handleNewUser()}>
            Upload User
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
                  <TableRow key={row.id | 0} onClick={() => handleRow(row.id)}>
                    <TableCell>{row.nombre}</TableCell>
                    <TableCell>{row.apellido}</TableCell>
                    <TableCell>{row.role}</TableCell>
                    <TableCell>{row.estado}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Usuarios;
