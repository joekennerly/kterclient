import React, { useEffect, useState } from "react"
import "./Profile.css"
import { Link } from "react-router-dom"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import { makeStyles } from "@material-ui/core/styles"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import ProductList from "./ProductList"
import CustomerList from "./CustomerList"
import CustomerForm from "./CustomerForm"

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

export default function Profile(props) {
    //API
    const { categories } = props
    const [user, setUser] = useState([])
    const [products, setProducts] = useState([])
    const [customers, setCustomers] = useState([])
    const [confirmed, setConfirmed] = useState([])

    //Material UI
    const [open, setOpen] = useState(false)
    const handleClickOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const classes = useStyles()
    const [selected, setSelected] = useState("")
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")

    const handleCategory = e => setSelected(e.target.value)
    const handleName = e => setName(e.target.value)
    const handlePrice = e => setPrice(e.target.value)
    const handleDescription = e => setDescription(e.target.value)

    const getUser = () =>
        fetch("http://localhost:8000/vendor", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Token ${localStorage.getItem("kter_token")}`
            }
        })
            .then(response => response.json())
            .then(user => {
                setUser(user)
            })

    const getProducts = () =>
        fetch("http://localhost:8000/product?vendor=current", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Token ${localStorage.getItem("kter_token")}`
            }
        })
            .then(response => response.json())
            .then(products => {
                setProducts(products)
            })

    const getCustomers = () =>
        fetch("http://localhost:8000/customer?vendor=current", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Token ${localStorage.getItem("kter_token")}`
            }
        })
            .then(response => response.json())
            .then(customers => {
                setCustomers(customers)
            })

    const getConfirmed = () =>
        fetch("http://localhost:8000/order", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Token ${localStorage.getItem("kter_token")}`
            }
        })
            .then(response => response.json())
            .then(confirmed => {
                setConfirmed(confirmed)
            })

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
            console.log({
                name: name,
                productcategory_id: selected,
                price: price,
                description: description
            })
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

    useEffect(() => {
        getUser()
        getProducts()
        getCustomers()
        getConfirmed()
    }, [])

    return (
        <>
            {user.map(vendor => (
                <section key={vendor.id} id="profile">
                    <h1>Welcome {vendor.user.first_name}</h1>
                </section>
            ))}
            <h3>Confirmed Orders</h3>
            {confirmed.map(order => {
                return (
                    <Link
                        key={order.id}
                        to={`/order/${order.id}/${order.customer_id}`}
                    >
                        {order.payment ? (
                            <p style={{ color: "springgreen" }}>
                                {order.location} {order.start.slice(0, 10)}
                            </p>
                        ) : (
                            <p style={{ color: "tomato" }}>
                                {order.location} {order.start.slice(0, 10)}
                            </p>
                        )}
                    </Link>
                )
            })}
            <section className="manage">
                <article className="sub-manage">
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleClickOpen}
                    >
                        Add New Product
                    </Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">
                            Add A New Product
                        </DialogTitle>
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
                                <InputLabel id="open-select-label">
                                    Category
                                </InputLabel>
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
                                            <MenuItem
                                                key={category.id}
                                                value={category.id}
                                            >
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
                    </Dialog>
                    <ProductList
                        products={products}
                        getProducts={getProducts}
                    />
                </article>
                <article className="sub-manage">
                    <CustomerForm getCustomers={getCustomers} />
                    <CustomerList
                        customers={customers}
                        getCustomers={getCustomers}
                    />
                </article>
            </section>
        </>
    )
}
