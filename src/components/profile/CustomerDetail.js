import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import PaymentForm from "./PaymentForm"
import CustomerEdit from "./CustomerEdit"
import EventList from "./EventList"
import EventForm from "./EventForm"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import Grid from "@material-ui/core/Grid"

const CustomerDetail = props => {
  const [customer, setCustomer] = useState([])
  const [payments, setPayments] = useState([])
  const [orders, setOrders] = useState([])

  const [openEdit, setOpenEdit] = useState(false)
  const handleOpenEdit = () => setOpenEdit(true)
  const handleCloseEdit = () => setOpenEdit(false)

  const [openPay, setOpenPay] = useState(false)
  const handleOpenPay = () => setOpenPay(true)
  const handleClosePay = () => setOpenPay(false)

  const [openEv, setOpenEv] = useState(false)
  const handleOpenEv = () => setOpenEv(true)
  const handleCloseEv = () => setOpenEv(false)

  const getCustomer = customerId => {
    fetch(`https://kterapi.herokuapp.com/customer/${customerId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("kter_token")}`
      }
    })
      .then(response => response.json())
      .then(customer => {
        setCustomer(customer)
      })
  }

  const getPayments = customerId => {
    fetch(`https://kterapi.herokuapp.com/payment?customer_id=${customerId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("kter_token")}`
      }
    })
      .then(response => response.json())
      .then(payments => {
        setPayments(payments)
      })
  }

  const getOrders = customerId => {
    fetch(`https://kterapi.herokuapp.com/order?customer_id=${customerId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("kter_token")}`
      }
    })
      .then(response => response.json())
      .then(orders => {
        setOrders(orders)
      })
  }

  const deleteItem = id => {
    fetch(`https://kterapi.herokuapp.com/customer/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("kter_token")}`
      }
    }).then(() => {
      props.getCustomers()
      props.history.push("/profile")
    })
  }

  useEffect(() => {
    getCustomer(props.customerId)
    getPayments(props.customerId)
    getOrders(props.customerId)
  }, [props.customerId])

  return (
    <Grid container spacing={3}>
      <Grid item>
      <Typography variant="h4">{customer.name}</Typography>
      <Typography>{customer.phone}</Typography>
      <Typography>{customer.city}</Typography>
      <Button
        variant="outlined"
        onClick={() => {
          if (window.confirm("Are you sure? This will delete all events for this customer")) {
            deleteItem(customer.id)
          }
        }}
      >
        Delete
      </Button>
      <Button variant="outlined" onClick={handleOpenEdit}>
        Edit
      </Button>
      <Dialog
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <CustomerEdit customer={customer} getCustomers={props.getCustomers} getCustomer={()=>getCustomer(customer.id)} handleCloseEdit={handleCloseEdit}/>
      </Dialog>

      <Typography variant="h6">Payment Types</Typography>
      <Button variant="outlined" color="primary" onClick={handleOpenPay}>
        Add A Payment
      </Button>
      {payments.map(payment => (
        <div key={payment.id}>
          <Link to={`/payment/${payment.id}`}>{payment.merchant_name}</Link>
        </div>
      ))}
      <Dialog
        open={openPay}
        onClose={handleClosePay}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <PaymentForm
          getPayments={() => getPayments(customer.id)}
          customerId={customer.id}
          handleClosePay={handleClosePay}
        />
      </Dialog>
      </Grid>
      <Grid item>
      <Typography variant="h6">Events</Typography>
      <Button variant="outlined" color="primary" onClick={handleOpenEv}>
        Add An Event
      </Button>
      <Dialog
        open={openEv}
        onClose={handleCloseEv}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <EventForm
          customerId={customer.id}
          getOrders={() => getOrders(customer.id)}
          handleCloseEv={handleCloseEv}
        />
      </Dialog>
      <EventList orders={orders} customer={customer} />
      </Grid>
    </Grid>
  )
}
export default CustomerDetail
