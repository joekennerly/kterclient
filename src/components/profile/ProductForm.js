import React, { useState } from "react"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import TextField from "@material-ui/core/TextField"
import InputLabel from "@material-ui/core/InputLabel"
import FormControl from "@material-ui/core/FormControl"
import { makeStyles } from "@material-ui/core/styles"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import Button from "@material-ui/core/Button"

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

export default function ProductForm(props) {
    const { categories, getProducts, handleClose } = props
    const classes = useStyles()

    const [selected, setSelected] = useState("")
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")

    const handleCategory = e => setSelected(e.target.value)
    const handleName = e => setName(e.target.value)
    const handlePrice = e => setPrice(e.target.value)
    const handleDescription = e => setDescription(e.target.value)

    //Post a product, then set state back to ""
    const postProduct = () => {
        if (
            name === "" ||
            selected === "" ||
            price === "" ||
            description === ""
        ) {
            window.alert("Please fill out all form fields")
        } else {
            fetch("http://localhost:8000/product", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Token ${localStorage.getItem("kter_token")}`
                },
                body: JSON.stringify({
                    name: name,
                    productcategory_id: selected,
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
                    getProducts()
                    handleClose()
                })
        }
    }
    return (
        <>
            <DialogTitle id="form-dialog-title">Add Food Item</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    This will be added to your product inventory.
                </DialogContentText>
                <TextField
                    autoFocus
                    required
                    onChange={handleName}
                    margin="dense"
                    id="name"
                    label="Name of Product"
                    type="text"
                />
                <FormControl className={classes.formControl}>
                    <InputLabel id="open-select-label">Category</InputLabel>
                    <Select
                        labelId="open-select-label"
                        id="open-select"
                        value={selected}
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
                />
                <TextField
                    required
                    margin="dense"
                    onChange={handleDescription}
                    id="description"
                    type="text"
                    label="Description"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={postProduct} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </>
    )
}
