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

import OutletService from '../../services/Outlet'

const Outlet = () => {
  //state
  const outletData = [];
  const [outlets, setOutlet] = useState(outletData);
  const [insert, setInsert] = useState(false);
  const [insertOutlet, setInsertOutlet] = useState({});
  const [edit, setEdit] = useState(false);
  const [editOutlet, setEditOutlet] = useState({});

  //Initialized
  useEffect(() => {
    const fetchData = async () => {
      const result = await OutletService.retrieveAll();
      setOutlet(result.data);
    };

    fetchData();
  }, []);


  // CRUDfunctions
  const addOutlet = async outlet => {
    let result = await OutletService.create(outlet);
    setOutlet([...outlets, result.data]); //to include _id
  }

  const deleteOutlet = async id => {
    // setEditing(false)
    setOutlet(outlets.filter(outlet => outlet._id !== id));
    await OutletService.delete(id);
  }

  const updateOutlet = async (id, updatedOutlet) => {
    setOutlet(outlets.map(outlet => (outlet._id === id ? updatedOutlet : outlet)))
    await OutletService.update(id, updatedOutlet);
  }


  //Event handler
  const handleClickInsertOpen = () => {
    setInsert(true);
  };

  const handleInsertClose = () => {
    setInsert(false);
    addOutlet(insertOutlet)
  };

  const handleInsertCancel = () => {
    setInsert(false);
  };

  const handleInsertInputChange = event => {
    const { name, value } = event.target;
    setInsertOutlet({ ...insertOutlet, [name]: value});
  }

  const handleClickEditOpen = (outlet) => {
    setEditOutlet(outlet);
    setEdit(true);
  };

  const handleEditClose = () => {
    setEdit(false);
    updateOutlet(editOutlet._id, editOutlet);
  };

  const handleEditCancel = () => {
    setEdit(false);
  };

  const handleEditInputChange = event => {
    const { name, value } = event.target;
    setEditOutlet({ ...editOutlet, [name]: value });
  }


  return (
    <>
      <PageTitle title="Outlets" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <InsertWidget title="" upperTitle noBodyPadding insertNew={handleClickInsertOpen}>
            <Table className="mb-0">
              <TableHead>
                <TableRow>
                  <TableCell>Outlet Name</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {outlets.length > 0 ? (
                  outlets.map((outlet) => (
                    <TableRow key={outlet._id}>
                      <TableCell className="pl-3 fw-normal">{outlet.name}</TableCell>
                      <TableCell>{outlet.address}</TableCell>
                      <TableCell>
                        <IconButton
                          color="primary"
                          // classes={{ root: classes.moreButton }}
                          aria-owns="widget-menu"
                          aria-haspopup="true"
                          onClick={() => { handleClickEditOpen(outlet) }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="primary"
                          // classes={{ root: classes.moreButton }}
                          aria-owns="widget-menu"
                          aria-haspopup="true"
                          onClick={() => {
                            deleteOutlet(outlet._id)
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                    <tr>
                      <td colSpan={5}>No Outlet</td>
                    </tr>
                  )}
              </TableBody>
            </Table>

          </InsertWidget>
        </Grid>
      </Grid>

      {/* Insert Dialog */}
      <Dialog open={insert} onClose={handleInsertClose} aria-labelledby="form-dialog-title" disableBackdropClick>
        <DialogTitle id="form-dialog-title">Insert New Outlet</DialogTitle>
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
            id="address"
            name="address"
            label="Address"
            fullWidth
            onChange={handleInsertInputChange}
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
        <DialogTitle id="form-dialog-title">Edit Outlet {editOutlet._id}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            variant="standard"
            id="name"
            name="name"
            label="Name"
            defaultValue={editOutlet.name}
            fullWidth
            onChange={handleEditInputChange}
          />
          <TextField
            variant="standard"
            id="address"
            name="address"
            label="Address"
            defaultValue={editOutlet.address}
            fullWidth
            onChange={handleEditInputChange}
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

export default Outlet;