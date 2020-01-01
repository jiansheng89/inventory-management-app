import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@material-ui/core";

// components
import { Button } from "../../../../components/Wrappers";

const states = {
  sent: "success",
  pending: "warning",
  declined: "secondary",
};

const TableComponent = ({ data }) => {
  data = data.filter(inventory => inventory.alertCount >= inventory.totalQualtity)
  return (
    <Table className="mb-0">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Cost</TableCell>
          <TableCell>Total Quantity</TableCell>
          <TableCell>Alert Count</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.length > 0 ? (
          data.map((inventory) => (
            <TableRow key={inventory._id}>
              <TableCell className="pl-3 fw-normal">{inventory.name}</TableCell>
              <TableCell>{inventory.cost}</TableCell>
              <TableCell>{inventory.totalQualtity}</TableCell>
              <TableCell>{inventory.alertCount}</TableCell>
            </TableRow>
          ))
        ) : (
            <tr>
              <td colSpan={5}>No Inventory</td>
            </tr>
          )}
      </TableBody>
    </Table>
  );
}

export default TableComponent;