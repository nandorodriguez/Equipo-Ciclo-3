import React from "react";
import { TableBody, TableCell, TableRow, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Switch,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
const UsuarioTablaBody = ({
  rows,
  searchData,
  handleUpdateStateUser,
  handleDeleteRow,
  handleEditRow,
}) => {
  return (
    <TableBody>
      {rows
        .filter((row) =>
          JSON.stringify(row)
            .trim()
            .toLowerCase()
            .includes(searchData.trim().toLowerCase())
        )
        .map((row) => (
          <TableRow key={row._id} hover>
            <>
              <TableCell align="center">
                <IconButton onClick={() => handleDeleteRow(row._id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>

              <TableCell align="center">
                <IconButton onClick={() => handleEditRow(row._id)}>
                  <EditIcon />
                </IconButton>
              </TableCell>
            </>

            <TableCell>{row.nombre}</TableCell>
            <TableCell>{row.apellido}</TableCell>
            <TableCell> {row.role} </TableCell>
            <TableCell>
              <FormControlLabel
                control={
                  <Switch
                    checked={row.estado !== "Inactive" ? true : false}
                    onChange={() => handleUpdateStateUser(row._id)}
                    label={row.estado}
                  />
                }
                label={row.estado}
              />
            </TableCell>
          </TableRow>
        ))}
    </TableBody>
  );
};

export default UsuarioTablaBody;
