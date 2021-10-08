import React from "react";
import { TableBody, TableCell, TableRow, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const VentasTablaBody = ({
  rows,
  searchData,
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
  );
};

export default VentasTablaBody;
