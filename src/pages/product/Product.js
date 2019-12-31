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

import ProductService from '../../services/Product'

const Product = () => {
  //state
  const productData = [];
  const [products, setProduct] = useState(productData);
  const [insert, setInsert] = useState(false);
  const [insertProduct, setInsertProduct] = useState({});
  const [edit, setEdit] = useState(false);
  const [editProduct, setEditProduct] = useState({});

  //Initialized
  useEffect(() => {
    const fetchData = async () => {
      const result = await ProductService.retrieveAll();
      console.log(result)
      setProduct(result.data);
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
    setInsertProduct({ ...insertProduct, [name]: value});
  }

  const handleClickEditOpen = (product) => {
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


  return (
    <>
      <PageTitle title="Products" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <InsertWidget title="" upperTitle noBodyPadding insertNew={handleClickInsertOpen}>
            <Table className="mb-0">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
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
                      <TableCell>{product._id}</TableCell>
                      <TableCell className="pl-3 fw-normal">{product.name}</TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>{product.recipe}</TableCell>
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
          <TextField
            variant="standard"
            id="recipe"
            name="recipe"
            label="Recipe"
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
          <TextField
            variant="standard"
            id="recipe"
            name="recipe"
            label="Recipe"
            defaultValue={editProduct.recipe}
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

export default Product;