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
  Select,
} from "@material-ui/core";

import {
  Edit as EditIcon,
  HighlightOff as DeleteIcon,
} from "@material-ui/icons";

// components
import { Button } from "../../components/Wrappers";

import SalesService from '../../services/Sales'
import ProductService from '../../services/Product'

const Sales = () => {
  //state
  const salesData = [];
  const [sales, setSales] = useState(salesData);
  const [insert, setInsert] = useState(false);
  const [insertSale, setInsertSale] = useState({});
  const [edit, setEdit] = useState(false);
  const [editSale, setEditSale] = useState({});
  const [products, setProduct] = useState([]);
  const [salesProductValue, setSalesProductValue] = useState([]);

  //Initialized
  useEffect(() => {
    const fetchData = async () => {
      const result = await SalesService.retrieveAll();
      setSales(result.data);

      const productServiceResult = await ProductService.retrieveAll();
      setProduct(productServiceResult.data);
    };

    fetchData();
  }, []);


  // CRUDfunctions
  const addSale = async sale => {

    let result = await SalesService.create(sale);
    setSales([...sales, result.data]);
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


  const handleInsertSelectChange = event => {
    const { options } = event.target;
    const value = [];
    const tempSalesProductValue = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        let selectedSalesProduct = products.filter(product => product._id === options[i].value)[0];
        delete selectedSalesProduct.price;
        delete selectedSalesProduct.recipe;
        delete selectedSalesProduct.__v;
        selectedSalesProduct.amount = 1;
        value.push(products.filter(product => product._id === options[i].value)[0]);
        tempSalesProductValue.push(options[i].value);
      }
    }
    setSalesProductValue(tempSalesProductValue);
    console.log(value)
    insertSale.salesItem = value;
    // setInsertProduct({ ...insertProduct, 'recipe': value });
    setInsertSale(insertSale);
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

  const handleEditSelectChange = event => {
    const { options } = event.target;
    const value = [];
    const tempSalesProductValue = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        let selectedSalesProduct = products.filter(product => product._id === options[i].value)[0];
        delete selectedSalesProduct.price;
        delete selectedSalesProduct.recipe;
        delete selectedSalesProduct.__v;
        selectedSalesProduct.amount = 1;
        value.push(products.filter(product => product._id === options[i].value)[0]);
        tempSalesProductValue.push(options[i].value);
      }
    }
    setSalesProductValue(tempSalesProductValue);
    console.log(value)
    editSale.salesItem = value;
    // setInsertProduct({ ...insertProduct, 'recipe': value });
    setEditSale(editSale);
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
                      <TableCell>
                        <Table className="mb-0">
                          <TableHead>
                            <TableRow>
                              <TableCell>Product Name</TableCell>
                              <TableCell>Amount</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {sale.salesItem.length > 0 ? (
                              sale.salesItem.map((singleSalesItem) => (
                                <TableRow>
                                  <TableCell>{singleSalesItem.name}</TableCell>
                                  <TableCell>{singleSalesItem.amount}</TableCell>
                                </TableRow>
                              ))
                            ) : (
                                <tr>
                                  <td colSpan={2}>No Product</td>
                                </tr>
                              )}
                          </TableBody>
                        </Table>
                      </TableCell>
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
                      <td colSpan={5}>No Sales</td>
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
          <h3>Sales Item</h3>
          <Select
            fullWidth
            multiple
            native
            value={salesProductValue}
            label="Sales Item"
            onChange={handleInsertSelectChange}
            inputProps={{
              id: 'select-multiple-native',
            }}
          >
            {products.map(product => (
              <option key={product._id} value={product._id}>
                {product.name}
              </option>
            ))}
          </Select>
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
          <h3>Sales Item</h3>
          <Select
            fullWidth
            multiple
            native
            value={salesProductValue}
            label="Sales Item"
            onChange={handleEditSelectChange}
            inputProps={{
              id: 'select-multiple-native',
            }}
          >
            {products.map(product => (
              <option key={product._id} value={product._id}>
                {product.name}
              </option>
            ))}
          </Select>
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