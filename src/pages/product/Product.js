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
  Input,
  MenuItem
} from "@material-ui/core";

import {
  Edit as EditIcon,
  HighlightOff as DeleteIcon,
} from "@material-ui/icons";

// components
import { Button } from "../../components/Wrappers";

import ProductService from '../../services/Product'
import InventoryService from '../../services/Inventory'

const Product = () => {
  //state
  const productData = [];
  const [products, setProduct] = useState(productData);
  const [inventories, setInventories] = useState([]);
  const [insert, setInsert] = useState(false);
  const [insertProduct, setInsertProduct] = useState({ recipe: [] });
  const [edit, setEdit] = useState(false);
  const [editProduct, setEditProduct] = useState({ recipe: [] });
  const [recipeValue, setRecipeValue] = useState({ recipe: [] });

  //Initialized
  useEffect(() => {
    const fetchData = async () => {
      const result = await ProductService.retrieveAll();
      console.log(result)
      setProduct(result.data);

      const inventoriesServiceResult = await InventoryService.retrieveAll();
      setInventories(inventoriesServiceResult.data);
    };

    fetchData();
  }, []);


  // CRUDfunctions
  const addProduct = async product => {
    let result = await ProductService.create(product);
    console.log(result)
    setProduct([...products, result.data]); //to include _id
  }

  const deleteProduct = async id => {
    // setEditing(false)
    setProduct(products.filter(product => product._id !== id));
    await ProductService.delete(id);
  }

  const updateProduct = async (id, updatedProduct) => {
    setProduct(products.map(product => (product._id === id ? updatedProduct : product)))
    await ProductService.update(id, updatedProduct);
  }


  //Event handler
  const handleClickInsertOpen = () => {
    setInsert(true);
  };

  const handleInsertClose = () => {
    setInsert(false);
    addProduct(insertProduct)
  };

  const handleInsertCancel = () => {
    setInsert(false);
  };

  const handleInsertInputChange = event => {
    const { name, value } = event.target;
    setInsertProduct({ ...insertProduct, [name]: value });
  }

  const handleInsertSelectChange = event => {
    const { options } = event.target;
    const value = [];
    const tempRecipeValue = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        let selectdInventory = inventories.filter(inventory => inventory._id === options[i].value)[0];
        delete selectdInventory.cost;
        delete selectdInventory.totalQualtity;
        delete selectdInventory.alertCount;
        delete selectdInventory.quantity;
        delete selectdInventory.relatedProduct;
        delete selectdInventory.__v;
        selectdInventory.amount = 1;
        value.push(inventories.filter(inventory => inventory._id === options[i].value)[0]);
        tempRecipeValue.push(options[i].value);
      }
    }
    setRecipeValue(tempRecipeValue);
    console.log(value)
    insertProduct.recipe = value;
    // setInsertProduct({ ...insertProduct, 'recipe': value });
    setInsertProduct(insertProduct);
  }

  const handleClickEditOpen = (product) => {
    console.log(product)
    let editRecipe = product.recipe;
    // product.recipeValue = ;
    setRecipeValue(editRecipe.map(value => value._id));
    // console.log(product)
    setEditProduct(product);
    setEdit(true);
  };

  const handleEditClose = () => {
    setEdit(false);
    updateProduct(editProduct._id, editProduct);
  };

  const handleEditCancel = () => {
    setEdit(false);
  };

  const handleEditInputChange = event => {
    const { name, value } = event.target;
    setEditProduct({ ...editProduct, [name]: value });
  }

  const handleEditSelectChange = event => {
    console.log(event)
    console.log(event.target.value)
    // const { name, value } = event.target;
    // setInsertProduct({ ...insertProduct, [name]: value });
    const { options } = event.target;
    const value = [];
    const tempRecipeValue = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        let selectdInventory = inventories.filter(inventory => inventory._id === options[i].value)[0];
        delete selectdInventory.cost;
        delete selectdInventory.totalQualtity;
        delete selectdInventory.alertCount;
        delete selectdInventory.quantity;
        delete selectdInventory.relatedProduct;
        delete selectdInventory.__v;
        selectdInventory.amount = 1;
        value.push(inventories.filter(inventory => inventory._id === options[i].value)[0]);
        tempRecipeValue.push(options[i].value);
      }
    }
    setRecipeValue(tempRecipeValue);
    console.log(value)
    editProduct.recipe = value;
    // setInsertProduct({ ...insertProduct, 'recipe': value });
    setEditProduct(editProduct);
  }


  return (
    <>
      <PageTitle title="Products" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <InsertWidget title="" upperTitle noBodyPadding insertNew={handleClickInsertOpen}>
            <Table className="mb-0">
              <TableHead>
                <TableRow>
                  <TableCell>Product Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Recipe</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell className="pl-3 fw-normal">{product.name}</TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>
                        <Table className="mb-0">
                          <TableHead>
                            <TableRow>
                              <TableCell>Inventory Name</TableCell>
                              <TableCell>Amount</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {product.recipe.length > 0 ? (
                              product.recipe.map((inventory) => (
                                <TableRow>
                                  <TableCell>{inventory.name}</TableCell>
                                  <TableCell>{inventory.amount}</TableCell>
                                </TableRow>
                              ))
                            ) : (
                                <tr>
                                  <td colSpan={2}>No Inventory</td>
                                </tr>
                              )}
                          </TableBody>
                        </Table>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          color="primary"
                          // classes={{ root: classes.moreButton }}
                          aria-owns="widget-menu"
                          aria-haspopup="true"
                          onClick={() => { handleClickEditOpen(product) }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="primary"
                          // classes={{ root: classes.moreButton }}
                          aria-owns="widget-menu"
                          aria-haspopup="true"
                          onClick={() => {
                            deleteProduct(product._id)
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                    <tr>
                      <td colSpan={5}>No Product</td>
                    </tr>
                  )}
              </TableBody>
            </Table>

          </InsertWidget>
        </Grid>
      </Grid>

      {/* Insert Dialog */}
      <Dialog open={insert} onClose={handleInsertClose} aria-labelledby="form-dialog-title" disableBackdropClick>
        <DialogTitle id="form-dialog-title">Insert New Product</DialogTitle>
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
            id="price"
            name="price"
            label="Price"
            type="number"
            fullWidth
            onChange={handleInsertInputChange}
          />
          {/* <TextField
            variant="standard"
            id="recipe"
            name="recipe"
            label="Recipe"
            fullWidth
            onChange={handleInsertInputChange}
            disabled
          /> */}
          <h3>Ingredient</h3>
          <Select
            fullWidth
            multiple
            native
            value={recipeValue}
            onChange={handleInsertSelectChange}
            inputProps={{
              id: 'select-multiple-native',
            }}
          >
            {inventories.map(inventory => (
              <option key={inventory._id} value={inventory._id}>
                {inventory.name}
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
        <DialogTitle id="form-dialog-title">Edit Product {editProduct._id}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            variant="standard"
            id="name"
            name="name"
            label="Name"
            defaultValue={editProduct.name}
            fullWidth
            onChange={handleEditInputChange}
          />
          <TextField
            variant="standard"
            id="price"
            name="price"
            label="Price"
            type="number"
            defaultValue={editProduct.price}
            fullWidth
            onChange={handleEditInputChange}
          />
          <h3>Ingredient</h3>
          <Select
            fullWidth
            multiple
            native
            value={recipeValue}
            onChange={handleEditSelectChange}
            inputProps={{
              id: 'select-multiple-native',
            }}
          >
            {inventories.map(inventory => (
              <option key={inventory._id} value={inventory._id}>
                {inventory.name}
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

export default Product;