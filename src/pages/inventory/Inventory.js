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

import InventoryService from '../../services/Inventory'

const Inventory = () => {
  //state
  const inventoryData = [];
  const [inventories, setInventories] = useState(inventoryData);
  const [insert, setInsert] = useState(false);
  const [insertInventory, setInsertInventory] = useState({});
  const [edit, setEdit] = useState(false);
  const [editInventory, setEditInventory] = useState({});

  //Initialized
  useEffect(() => {
    const fetchData = async () => {
      const result = await InventoryService.retrieveAll();
      // console.log(result)
      setInventories(result.data);
    };

    fetchData();
  }, []);


  // CRUDfunctions
  const addInventory = async inventory => {
    let result = await InventoryService.create(inventory);
    setInventories([...inventories, result.data]); //to include _id
  }

  const deleteInventory = async id => {
    // setEditing(false)
    setInventories(inventories.filter(inventory => inventory._id !== id));
    await InventoryService.delete(id);
  }

  const updateInventory = async (id, updatedInventory) => {
    setInventories(inventories.map(inventory => (inventory._id === id ? updatedInventory : inventory)))
    await InventoryService.update(id, updatedInventory);
  }


  //Event handler
  const handleClickInsertOpen = () => {
    setInsert(true);
  };

  const handleInsertClose = () => {
    setInsert(false);
    addInventory(insertInventory)
  };

  const handleInsertCancel = () => {
    setInsert(false);
  };

  const handleInsertInputChange = event => {
    const { name, value } = event.target;
    setInsertInventory({ ...insertInventory, [name]: value });
  }

  const handleClickEditOpen = (inventory) => {
    setEditInventory(inventory);
    setEdit(true);
  };

  const handleEditClose = () => {
    setEdit(false);
    updateInventory(editInventory._id, editInventory);
  };

  const handleEditCancel = () => {
    setEdit(false);
  };

  const handleEditInputChange = event => {
    const { name, value } = event.target;
    setEditInventory({ ...editInventory, [name]: value });
  }


  return (
    <>
      <PageTitle title="Inventory" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <InsertWidget title="" upperTitle noBodyPadding insertNew={handleClickInsertOpen}>
            <Table className="mb-0">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Cost</TableCell>
                  <TableCell>Total Quantity</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Alert Count</TableCell>
                  <TableCell>Related Product</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {inventories.length > 0 ? (
                  inventories.map((inventory) => (
                    <TableRow key={inventory._id}>
                      <TableCell className="pl-3 fw-normal">{inventory.name}</TableCell>
                      <TableCell>{inventory.cost}</TableCell>
                      <TableCell>{inventory.totalQualtity}</TableCell>
                      <TableCell>{inventory.quantity}</TableCell>
                      <TableCell>{inventory.alertCount}</TableCell>
                      <TableCell>{inventory.relatedProduct}</TableCell>
                      <TableCell>
                        <IconButton
                          color="primary"
                          // classes={{ root: classes.moreButton }}
                          aria-owns="widget-menu"
                          aria-haspopup="true"
                          onClick={() => { handleClickEditOpen(inventory) }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="primary"
                          // classes={{ root: classes.moreButton }}
                          aria-owns="widget-menu"
                          aria-haspopup="true"
                          onClick={() => {
                            deleteInventory(inventory._id)
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                    <tr>
                      <td colSpan={8}>No users</td>
                    </tr>
                  )}
              </TableBody>
            </Table>

          </InsertWidget>
        </Grid>
      </Grid>

      {/* Insert Dialog */}
      <Dialog open={insert} onClose={handleInsertClose} aria-labelledby="form-dialog-title" disableBackdropClick>
        <DialogTitle id="form-dialog-title">Insert New Inventory</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            variant="standard"
            id="name"
            name="name"
            label="Name"
            fullWidth
            onChange={handleInsertInputChange}
          />
          <TextField
            variant="standard"
            id="cost"
            name="cost"
            label="Cost"
            type="number"
            fullWidth
            onChange={handleInsertInputChange}
          />
          <TextField
            variant="standard"
            id="totalQualtity"
            name="totalQualtity"
            label="Total Qualtity"
            type="number"
            fullWidth
            onChange={handleInsertInputChange}
          />
          <TextField
            variant="standard"
            id="quantity"
            name="quantity"
            label="Quantity"
            fullWidth
            onChange={handleInsertInputChange}
            disabled
          />
          <TextField
            variant="standard"
            id="alertCount"
            name="alertCount"
            label="Alert Count"
            type="number"
            fullWidth
            onChange={handleInsertInputChange}
          />
          <TextField
            variant="standard"
            id="relatedProduct"
            name="relatedProduct"
            label="Related Product"
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
        <DialogTitle id="form-dialog-title">Edit Inventory {editInventory._id}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            variant="standard"
            id="name"
            name="name"
            label="Name"
            defaultValue={editInventory.name}
            fullWidth
            onChange={handleEditInputChange}
          />
          <TextField
            variant="standard"
            id="cost"
            name="cost"
            label="Cost"
            type="number"
            defaultValue={editInventory.cost}
            fullWidth
            onChange={handleEditInputChange}
          />
          <TextField
            variant="standard"
            id="totalQualtity"
            name="totalQualtity"
            label="Total Qualtity"
            type="number"
            defaultValue={editInventory.totalQualtity}
            fullWidth
            onChange={handleEditInputChange}
          />
          <TextField
            variant="standard"
            id="quantity"
            name="quantity"
            label="Quantity"
            defaultValue={editInventory.quantity}
            fullWidth
            onChange={handleEditInputChange}
            disabled
          />
          <TextField
            variant="standard"
            id="alertCount"
            name="alertCount"
            label="Alert Count"
            type="number"
            defaultValue={editInventory.alertCount}
            fullWidth
            onChange={handleEditInputChange}
          />
          <TextField
            variant="standard"
            id="relatedProduct"
            name="relatedProduct"
            label="Related Product"
            defaultValue={editInventory.relatedProduct}
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

export default Inventory;