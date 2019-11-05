import React, { useEffect, useState } from "react"
import "./Profile.css"
import AllOrders from "./AllOrders"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import ProductList from "./ProductList"
import ProductForm from "./ProductForm"
import CustomerList from "./CustomerList"
import CustomerForm from "./CustomerForm"

export default function Profile(props) {
    //API
    const [products, setProducts] = useState([])
    const [customers, setCustomers] = useState([])
    const [confirmed, setConfirmed] = useState([])

    //Product Dialog Controls
    const [open, setOpen] = useState(false)
    const handleClickOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    //Customer Dialog Controls
    const [openCust, setOpenCust] = useState(false)
    const handleCustOpen = () => setOpenCust(true)
    const handleCustClose = () => setOpenCust(false)

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

    useEffect(() => {
        getProducts()
        getCustomers()
        getConfirmed()
    }, [])

    return (
        <>
            <AllOrders confirmed={confirmed}/>
            <section className="manage">
                <article className="sub-manage">
                    <Button
                        variant="contained"
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
                        <ProductForm categories={props.categories} getProducts={getProducts} handleClose={handleClose}/>
                    </Dialog>
                    <ProductList
                        products={products}
                        getProducts={getProducts}
                    />
                </article>
                <article className="sub-manage">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCustOpen}
                    >
                        Add New Customer
                    </Button>
                    <Dialog
                        open={openCust}
                        onClose={handleCustClose}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogContent>
                            <CustomerForm
                                getCustomers={getCustomers}
                                handleCustClose={handleCustClose}
                            />
                        </DialogContent>
                    </Dialog>
                    <CustomerList
                        customers={customers}
                        getCustomers={getCustomers}
                    />
                </article>
            </section>
        </>
    )
}
