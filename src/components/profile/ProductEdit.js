import React, { useState, useEffect } from "react"
import "./Profile.css"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import InputLabel from "@material-ui/core/InputLabel"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  button: {
      display: "block",
      marginTop: theme.spacing(2)
  },
  formControl: {
      margin: theme.spacing(1),
      minWidth: 120
  }
}))

const ProductEdit = props => {
  //Get category resource and set it as category state
  const { product, getProduct, handleCloseEdit } = props
  const [categories, setCategory] = useState([])
  // const [product, setProduct] = useState([])
  const classes = useStyles()

  const [selected, setSelected] = useState(product.productcategory_id)
  const [name, setName] = useState(product.name)
  const [price, setPrice] = useState(product.price)
  const [description, setDescription] = useState(product.description)

  const handleCategory = e => setSelected(e.target.value)
  const handleName = e => setName(e.target.value)
  const handlePrice = e => setPrice(e.target.value)
  const handleDescription = e => setDescription(e.target.value)

  const getCategory = () => {
    fetch("http://localhost:8000/category", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("kter_token")}`
      }
    })
      .then(response => response.json())
      .then(categories => {
        setCategory(categories)
      })
  }

  // const getProduct = productId => {
  //   fetch(`http://localhost:8000/product/${productId}`, {
  //     method: "GET",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       Authorization: `Token ${localStorage.getItem("kter_token")}`
  //     }
  //   })
  //     .then(response => response.json())
  //     .then(product => {
  //       setProduct(product)
  //     })
  // }

  useEffect(() => {
    getCategory()
    // getProduct(props.productId)
  }, [])
  // }, [props.productId])

  //Input Refs
  // const name = useRef()
  // const productcategory = useRef()
  // const price = useRef()
  // const description = useRef()

  //put a product, then set refs back to ""
  const postProduct = id => {
    if (name === "" || selected === "" || price === "" || description === "") {
      window.alert("Please fill out all form fields")
    } else {
      fetch(`http://localhost:8000/product/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("kter_token")}`
        },
        body: JSON.stringify({
          name: name,
          productcategory_id: +selected,
          price: price,
          description: description
        })
      })
        .then(() => {
          setName("")
          setSelected("")
          setPrice("")
          setDescription("")
        })
        .then(() => {
          getProduct()
          handleCloseEdit()
        })
    }
  }

  //Render Product edit form
  return (
    <>
      <DialogTitle id="edit-form-dialog-title">Edit Food Item</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Update this food item in your product inventory
        </DialogContentText>
        <TextField
          autoFocus
          required
          onChange={handleName}
          margin="dense"
          id="name"
          label="Name of Product"
          type="text"
          defaultValue={name}
        />
        <FormControl className={classes.formControl}>
          <InputLabel id="open-select-label">Category</InputLabel>
          <Select
            labelId="open-select-label"
            id="open-select"
            defaultValue={selected}
            onChange={handleCategory}
          >
            <MenuItem disabled value="">
              <em>None</em>
            </MenuItem>
            {categories.map(category => {
              return (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
        <TextField
          required
          onChange={handlePrice}
          margin="dense"
          id="price"
          type="number"
          label="Price"
          defaultValue={price}
        />
        <TextField
          required
          margin="dense"
          onChange={handleDescription}
          id="description"
          type="text"
          label="Description"
          defaultValue={description}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseEdit} color="primary">
          Cancel
        </Button>
        <Button onClick={()=>postProduct(product.id)} color="primary">
          Submit
        </Button>
      </DialogActions>
    </>
    // <div className="form">
    //     <h1>Edit Product</h1>
    //     <input
    //         required
    //         ref={name}
    //         type="text"
    //         defaultValue={product.name}
    //         autoFocus
    //     />
    //     <select
    //         ref={productcategory}
    //         name="category"
    //         required
    //         value={product.productcategory_id}
    //     >
    //         <option>
    //             Select Category
    //         </option>
    //         {category.map(category => {
    //             return <option key={category.id} value={category.id}>{category.name}</option>
    //         })}
    //     </select>
    //     <input
    //         required
    //         ref={price}
    //         type="number"
    //         defaultValue={product.price} />
    //     <input
    //         required
    //         ref={description}
    //         type="text"
    //         defaultValue={product.description}
    //     />
    //     <button onClick={()=>postProduct(product.id)}>Submit</button>
    // </div>
  )
}
export default ProductEdit
