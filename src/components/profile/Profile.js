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
import Grid from "@material-ui/core/Grid"

export default function Profile(props) {
  // const {products, getProducts} = props
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
    fetch("http://127.0.0.1:8000/product?vendor=current", {
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
    fetch("http://127.0.0.1:8000/customer?vendor=current", {
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
    fetch("http://127.0.0.1:8000/order?current", {
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
    getCustomers()
    getProducts()
    getConfirmed()
  }, [])

  return (
    <Grid container spacing={3}>
      <Grid item xs={3}>
        <Button variant="contained" color="primary" onClick={handleCustOpen}>
          Add New Contact
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
        <CustomerList customers={customers} getCustomers={getCustomers} />
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Add A Food Item
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <ProductForm
            categories={props.categories}
            getProducts={getProducts}
            handleClose={handleClose}
          />
        </Dialog>
        <ProductList products={products} getProducts={getProducts} />
      </Grid>
      <Grid item xs={9}>
        <AllOrders confirmed={confirmed} />
      </Grid>
    </Grid>
  )
}
