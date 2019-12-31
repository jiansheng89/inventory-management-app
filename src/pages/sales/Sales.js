import React, { useState, useEffect } from "react";
import { Grid, IconButton } from "@material-ui/core";
// components
import PageTitle from "../../components/PageTitle/PageTitle";
import InsertWidget from "../../components/Widget/InsertWidget";

import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";

import {
  Edit as EditIcon,
  HighlightOff as DeleteIcon,
} from "@material-ui/icons";

// components
import { Button } from "../../components/Wrappers";

import SalesService from '../../services/Sales'

const Sales = () => {
  //state
  const salesData = [];
  const [sales, setSales] = useState(salesData);
  const [insert, setInsert] = useState(false);
  const [insertSale, setInsertSale] = useState({});
  const [edit, setEdit] = useState(false);
  const [editSale, setEditSale] = useState({});

  //Initialized
  useEffect(() => {
    const fetchData = async () => {
      const result = await SalesService.retrieveAll();
      setSales(result.data);
    };

    fetchData();
  }, []);


  // CRUDfunctions
  const addSale = async sale => {
    setSales([...sales, sale]);
    await SalesService.create(sale);
  }

  const deleteSales = async id => {
    // setEditing(false)
    setSales(sales.filter(sale => sale._id !== id));
    await SalesService.delete(id);
  }

  const updateSales = async (id, updatedSale) => {
    setSales(sales.map(sale => (sale._id === id ? updatedSale : sale)))
    await SalesService.update(id, updatedSale);
  }


  //Event handler
  const handleClickInsertOpen = () => {
    setInsert(true);
  };

  const handleInsertClose = () => {
    setInsert(false);
    addSale(insertSale)
  };

  const handleInsertCancel = () => {
    setInsert(false);
  };

  const handleInsertInputChange = event => {
    let now = new Date();
    const { name, value } = event.target;
    setInsertSale({ ...insertSale, [name]: value, salesDate: now.toISOString() });
  }

  const handleClickEditOpen = (sale) => {
    setEditSale(sale);
    setEdit(true);
  };

  const handleEditClose = () => {
    setEdit(false);
    updateSales(editSale._id, editSale);
  };

  const handleEditCancel = () => {
    setEdit(false);
  };

  const handleEditInputChange = event => {
    let now = new Date();
    const { name, value } = event.target;
    setEditSale({ ...editSale, [name]: value, salesDate: now.toISOString() });
  }


  return (
    <>
      <PageTitle title="Sales" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <InsertWidget title="" upperTitle noBodyPadding insertNew={handleClickInsertOpen}>
            <Table className="mb-0">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Total Sales</TableCell>
                  <TableCell>Sales Items</TableCell>
                  <TableCell>Transaction Date</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sales.length > 0 ? (
                  sales.map((sale) => (
                    <TableRow key={sale._id}>
                      <TableCell>{sale.salesId}</TableCell>
                      <TableCell className="pl-3 fw-normal">{sale.totalSales}</TableCell>
                      <TableCell>{sale.salesItem}</TableCell>
                      <TableCell>{sale.salesDate}</TableCell>
                      <TableCell>
                        <IconButton
                          color="primary"
                          // classes={{ root: classes.moreButton }}
                          aria-owns="widget-menu"
                          aria-haspopup="true"
                          onClick={() => { handleClickEditOpen(sale) }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="primary"
                          // classes={{ root: classes.moreButton }}
                          aria-owns="widget-menu"
                          aria-haspopup="true"
                          onClick={() => {
                            deleteSales(sale._id)
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                      {/* <TableCell>
                      <Button
                        color={states[status.toLowerCase()]}
                        size="small"
                        className="px-2"
                        variant="contained"
                      >
                        {status}
                      </Button>
                    </TableCell> */}
                    </TableRow>
                  ))
                ) : (
                    <tr>
                      <td colSpan={5}>No users</td>
                    </tr>
                  )}
              </TableBody>
            </Table>

          </InsertWidget>
        </Grid>
      </Grid>

      {/* Insert Dialog */}
      <Dialog open={insert} onClose={handleInsertClose} aria-labelledby="form-dialog-title" disableBackdropClick>
        <DialogTitle id="form-dialog-title">Insert New Sales</DialogTitle>
        <DialogContent>
          <TextField
            variant="standard"
            id="salesId"
            name="salesId"
            label="Sales ID"
            fullWidth
            onChange={handleInsertInputChange}
          />
          <TextField
            variant="standard"
            id="totalSales"
            name="totalSales"
            label="Total Sales"
            fullWidth
            onChange={handleInsertInputChange}
          />
          <TextField
            autoFocus
            variant="standard"
            id="salesItem"
            name="salesItem"
            label="Sales Item"
            fullWidth
            onChange={handleInsertInputChange}
            disabled
          />
          <TextField
            autoFocus
            variant="standard"
            id="salesDate"
            name="salesDate"
            label="Sales Date"
            fullWidth
            onChange={handleInsertInputChange}
            disabled
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleInsertCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleInsertClose} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={edit} onClose={handleEditClose} aria-labelledby="form-dialog-title" disableBackdropClick>
        <DialogTitle id="form-dialog-title">Edit Sales {editSale._id}</DialogTitle>
        <DialogContent>
          <TextField
            variant="standard"
            id="salesId"
            name="salesId"
            label="Sales ID"
            defaultValue={editSale.salesId}
            fullWidth
            onChange={handleEditInputChange}
            disabled
          />
          <TextField
            variant="standard"
            id="totalSales"
            name="totalSales"
            label="Total Sales"
            defaultValue={editSale.totalSales}
            fullWidth
            onChange={handleEditInputChange}
          />
          <TextField
            autoFocus
            variant="standard"
            id="salesItem"
            name="salesItem"
            label="Sales Item"
            fullWidth
            onChange={handleEditInputChange}
            disabled
          />
          <TextField
            autoFocus
            variant="standard"
            id="salesDate"
            name="salesDate"
            label="Sales Date"
            defaultValue={editSale.salesDate}
            fullWidth
            onChange={handleEditInputChange}
            disabled
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditClose} color="primary">
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Sales;