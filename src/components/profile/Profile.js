import React, { useEffect, useState, useRef } from "react"
import "./Profile.css"
import { Link } from "react-router-dom"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import ProductList from "./ProductList"
import CustomerList from "./CustomerList"
import CustomerForm from "./CustomerForm"

export default function Profile(props) {
    const { categories } = props
    const [user, setUser] = useState([])
    const [products, setProducts] = useState([])
    const [customers, setCustomers] = useState([])
    const [confirmed, setConfirmed] = useState([])

    console.log(categories)

    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => setOpen(true)

    const handleClose = () => setOpen(false)

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

    //Input Refs
    const name = useRef()
    const productcategory = useRef()
    const price = useRef()
    const description = useRef()

    //Post a product, then set refs back to ""
    const postProduct = () => {
        if (
            name.current.value === "" ||
            productcategory.current.value === "0" ||
            price.current.value === "" ||
            description.current.value === ""
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
                    name: name.current.value,
                    productcategory_id: +productcategory.current.value,
                    price: price.current.value,
                    description: description.current.value
                })
            })
                .then(() => {
                    name.current.value = ""
                    productcategory.current.value = "0"
                    price.current.value = ""
                    description.current.value = ""
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
                            <p>
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
                            Subscribe
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                To subscribe to this website, please enter your
                                email address here. We will send updates
                                occasionally.
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Email Address"
                                type="email"
                                fullWidth
                            />
                            <div className="form">
                                <h3>Add a product</h3>
                                <input
                                    required
                                    ref={name}
                                    type="text"
                                    placeholder="name"
                                    autoFocus
                                />
                                <select
                                    ref={productcategory}
                                    name="category"
                                    required
                                    defaultValue="0"
                                >
                                    <option value="0">Select Category</option>
                                    {categories.map(category => {
                                        return (
                                            <option
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </option>
                                        )
                                    })}
                                </select>
                                <input
                                    required
                                    ref={price}
                                    type="number"
                                    placeholder="price"
                                />
                                <input
                                    required
                                    ref={description}
                                    type="text"
                                    placeholder="description"
                                />
                                <button onClick={postProduct}>Submit</button>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleClose} color="primary">
                                Subscribe
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
