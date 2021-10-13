import React from "react";
import { TableCell, TableHead, TableRow } from "@mui/material";

const UsuarioTablaHeader = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell colSpan={2} align="center">
          <strong>Actions</strong>
        </TableCell>
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
  );
};
export default UsuarioTablaHeader;
