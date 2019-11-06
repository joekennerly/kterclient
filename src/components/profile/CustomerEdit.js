import React, { useState } from "react"
import "./Profile.css"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"

const CustomerEdit = props => {
  const { customer, getCustomer, handleCloseEdit } = props

    const [name, setName] = useState(customer.name)
    const [phone, setPhone] = useState(customer.phone)
    const [city, setCity] = useState(customer.city)

    const handleName = e => setName(e.target.value)
    const handlePhone = e => setPhone(e.target.value)
    const handleCity = e => setCity(e.target.value)

  const postCustomer = id => {
    if (name === "" || phone === "" || city === "") {
      window.alert("Please fill out all form fields")
    } else {
      fetch(`http://localhost:8000/customer/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("kter_token")}`
        },
        body: JSON.stringify({
          name,
          phone,
          city
        })
      })
        .then(() => {
          setName("")
          setPhone("")
          setCity("")
        })
        .then(() => {
          getCustomer()
          handleCloseEdit()
        })
    }
  }

  return (
    <>
      <DialogTitle id="edit-form-dialog-title">Edit Customer</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Update the information for {name}
        </DialogContentText>
        <TextField
          autoFocus
          required
          onChange={handleName}
          margin="dense"
          id="name"
          label="Name of Customer"
          defaultValue={name}
          type="text"
          fullWidth
        />
        <TextField
          required
          onChange={handlePhone}
          margin="dense"
          id="phone"
          type="text"
          label="Phone Number"
          defaultValue={phone}
          fullWidth
        />
        <TextField
          required
          margin="dense"
          onChange={handleCity}
          defaultValue={city}
          id="city"
          type="text"
          label="City"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseEdit} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            postCustomer(customer.id)
          }}
          color="primary"
        >
          Submit
        </Button>
      </DialogActions>
    </>
  )
}
export default CustomerEdit
