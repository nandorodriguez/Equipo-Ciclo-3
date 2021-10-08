import React from "react";
import { TableCell, TableHead, TableRow } from "@mui/material";

const VentasTablaHeader = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell align="center" colSpan={2}>
          <strong>Actions</strong>
        </TableCell>
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
  );
};

export default VentasTablaHeader;
