import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import PaymentForm from "./PaymentForm"
import EventList from "./EventList"
import EventForm from "./EventForm"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"

const CustomerDetail = props => {
  const [customer, setCustomer] = useState([])
  const [payments, setPayments] = useState([])
  const [orders, setOrders] = useState([])

  const [openPay, setOpenPay] = useState(false)
  const handleOpenPay = () => setOpenPay(true)
  const handleClosePay = () => setOpenPay(false)

  const [openEv, setOpenEv] = useState(false)
  const handleOpenEv = () => setOpenEv(true)
  const handleCloseEv = () => setOpenEv(false)

  const getCustomer = customerId => {
    fetch(`http://localhost:8000/customer/${customerId}`, {
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
    fetch(`http://localhost:8000/payment?customer_id=${customerId}`, {
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
    fetch(`http://localhost:8000/order?customer_id=${customerId}`, {
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
    fetch(`http://localhost:8000/customer/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("kter_token")}`
      }
    }).then(() => props.history.push("/profile"))
  }

  useEffect(() => {
    getCustomer(props.customerId)
    getPayments(props.customerId)
    getOrders(props.customerId)
  }, [props.customerId])

  return (
    <>
      <Typography variant="h4">{customer.name}</Typography>
      <Typography>{customer.phone}</Typography>
      <Button variant="outlined"
        onClick={() => {
          if (window.confirm("Are you sure?")) {
            deleteItem(customer.id)
          }
        }}
      >
        Delete
      </Button>
      <Button variant="outlined"
        onClick={() => {
          props.history.push(`/customer/${customer.id}/edit`)
        }}
      >
        Edit
      </Button>


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
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePay} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClosePay} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
        <PaymentForm
          getPayments={() => getPayments(customer.id)}
          customerId={customer.id}
        />
      </Dialog>


      <Typography variant="h6">Customer's Orders</Typography>
      <Button variant="outlined" color="primary" onClick={handleOpenEv}>
        Add An Event
      </Button>
      <Dialog
        open={openEv}
        onClose={handleCloseEv}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEv} color="primary">
            Disagree
          </Button>
          <Button onClick={handleCloseEv} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      <EventForm
        customerId={customer.id}
        getOrders={() => getOrders(customer.id)}
      />
      </Dialog>
      <EventList orders={orders} customer={customer} />
    </>
  )
}
export default CustomerDetail
