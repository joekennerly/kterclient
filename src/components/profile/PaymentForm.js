import React, { useState } from "react"
import "./Profile.css"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import moment from "moment"

const PaymentForm = props => {
  const { customerId, getPayments, handleClosePay } = props
  const [merchant_name, setName] = useState("")
  const [account_number, setNumber] = useState("")
  const [expiration, setExp] = useState("")

  const handleName = e => setName(e.target.value)
  const handleNumber = e => setNumber(e.target.value)
  const handleExp = e => setExp(e.target.value)

  const postPayment = () => {
    if (merchant_name === "" || account_number === "" || expiration === "") {
      window.alert("Please fill out all form fields")
    } else if (moment(expiration).isSameOrBefore(moment().format())) {
      window.alert("Payment type must not be expired")
    } else {
      fetch("http://localhost:8000/payment", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("kter_token")}`
        },
        body: JSON.stringify({
          customer_id: +customerId,
          merchant_name,
          account_number,
          expiration
        })
      })
        .then(() => {
          setName("")
          setNumber("")
          setExp("")
        })
        .then(() => {
          getPayments()
          handleClosePay ? handleClosePay() : console.log()
        })
    }
  }

  return (
    <>
      <DialogTitle id="form-dialog-title">Add Payment Type</DialogTitle>
      <DialogContent>
        <DialogContentText>
          At least one payment type is required to confirm an event.
        </DialogContentText>
        <TextField
          autoFocus
          required
          onChange={handleName}
          margin="dense"
          id="name"
          label="Type of Card (eg: Visa, Mastercard)"
          type="text"
          fullWidth
        />
        <TextField
          required
          onChange={handleNumber}
          margin="dense"
          id="number"
          type="text"
          label="Account Number"
          fullWidth
        />
        <TextField
          required
          id="date"
          onChange={handleExp}
          margin="dense"
          label="Expiration Date"
          type="date"
          InputLabelProps={{
            shrink: true
          }}
        />
        <DialogActions>
          <Button onClick={handleClosePay} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              postPayment()
            }}
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </DialogContent>
    </>
  )
}
export default PaymentForm
