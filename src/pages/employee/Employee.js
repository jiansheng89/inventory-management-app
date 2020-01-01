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

import EmployeeService from '../../services/Employee'

const Employee = () => {
  //state
  const EmployeeData = [];
  const [Employees, setEmployee] = useState(EmployeeData);
  const [insert, setInsert] = useState(false);
  const [insertEmployee, setInsertEmployee] = useState({});
  const [edit, setEdit] = useState(false);
  const [editEmployee, setEditEmployee] = useState({});

  //Initialized
  useEffect(() => {
    const fetchData = async () => {
      const result = await EmployeeService.retrieveAll();
      setEmployee(result.data);
    };

    fetchData();
  }, []);


  // CRUDfunctions
  const addEmployee = async Employee => {
    let result = await EmployeeService.create(Employee);
    setEmployee([...Employees, result.data]); //to include _id
  }

  const deleteEmployee = async id => {
    // setEditing(false)
    setEmployee(Employees.filter(Employee => Employee._id !== id));
    await EmployeeService.delete(id);
  }

  const updateEmployee = async (id, updatedEmployee) => {
    setEmployee(Employees.map(Employee => (Employee._id === id ? updatedEmployee : Employee)))
    await EmployeeService.update(id, updatedEmployee);
  }


  //Event handler
  const handleClickInsertOpen = () => {
    setInsert(true);
  };

  const handleInsertClose = () => {
    setInsert(false);
    addEmployee(insertEmployee)
  };

  const handleInsertCancel = () => {
    setInsert(false);
  };

  const handleInsertInputChange = event => {
    let now = new Date();
    const { name, value } = event.target;
    setInsertEmployee({ ...insertEmployee, [name]: value, createdAt: now.toISOString(), active: true, permissions:[]});
  }

  const handleClickEditOpen = (Employee) => {
    setEditEmployee(Employee);
    setEdit(true);
  };

  const handleEditClose = () => {
    setEdit(false);
    updateEmployee(editEmployee._id, editEmployee);
  };

  const handleEditCancel = () => {
    setEdit(false);
  };

  const handleEditInputChange = event => {
    const { name, value } = event.target;
    setEditEmployee({ ...editEmployee, [name]: value, active: true, permissions:[] });
  }


  return (
    <>
      <PageTitle title="Employees" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <InsertWidget title="" upperTitle noBodyPadding insertNew={handleClickInsertOpen}>
            <Table className="mb-0">
              <TableHead>
                <TableRow>
                  <TableCell>Employee Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Employees.length > 0 ? (
                  Employees.map((Employee) => (
                    <TableRow key={Employee._id}>
                      <TableCell className="pl-3 fw-normal">{Employee.name}</TableCell>
                      <TableCell>{Employee.email}</TableCell>
                      <TableCell>{Employee.phoneNumber}</TableCell>
                      <TableCell>
                        <IconButton
                          color="primary"
                          // classes={{ root: classes.moreButton }}
                          aria-owns="widget-menu"
                          aria-haspopup="true"
                          onClick={() => { handleClickEditOpen(Employee) }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="primary"
                          // classes={{ root: classes.moreButton }}
                          aria-owns="widget-menu"
                          aria-haspopup="true"
                          onClick={() => {
                            deleteEmployee(Employee._id)
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                    <tr>
                      <td colSpan={5}>No Employee</td>
                    </tr>
                  )}
              </TableBody>
            </Table>

          </InsertWidget>
        </Grid>
      </Grid>

      {/* Insert Dialog */}
      <Dialog open={insert} onClose={handleInsertClose} aria-labelledby="form-dialog-title" disableBackdropClick>
        <DialogTitle id="form-dialog-title">Insert New Employee</DialogTitle>
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
            id="email"
            name="email"
            label="Email"
            type="email"
            fullWidth
            onChange={handleInsertInputChange}
          />
          <TextField
            variant="standard"
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            type="number"
            fullWidth
            onChange={handleInsertInputChange}
          />
          {/* <TextField
            variant="standard"
            id="outlet"
            name="outlet"
            label="Outlet"
            fullWidth
            onChange={handleInsertInputChange}
            disabled
          /> */}
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
        <DialogTitle id="form-dialog-title">Edit Employee {editEmployee._id}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            variant="standard"
            id="name"
            name="name"
            label="Name"
            defaultValue={editEmployee.name}
            fullWidth
            onChange={handleEditInputChange}
          />
          <TextField
            variant="standard"
            id="email"
            name="email"
            label="Email"
            type="email"
            defaultValue={editEmployee.email}
            fullWidth
            onChange={handleEditInputChange}
          />
          <TextField
            variant="standard"
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            type="number"
            defaultValue={editEmployee.phoneNumber}
            fullWidth
            onChange={handleEditInputChange}
          />
          {/* <TextField
            variant="standard"
            id="outlet"
            name="outlet"
            label="Outlet"
            defaultValue={editEmployee.outlet}
            fullWidth
            onChange={handleEditInputChange}
            disabled
          /> */}
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

export default Employee;