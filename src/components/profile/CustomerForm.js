import React, { useState } from "react"
import "./Profile.css"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"

const CustomerForm = props => {
    const { handleCustClose, getCustomers } = props

    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [city, setCity] = useState("")

    const handleName = e => setName(e.target.value)
    const handlePhone = e => setPhone(e.target.value)
    const handleCity = e => setCity(e.target.value)

    //Post a Customer, then set refs back to ""
    const postCustomer = () => {
        if (name === "" || phone === "" || city === "") {
            window.alert("Please fill out all form fields")
        } else {
            console.log({ name, phone, city })
            fetch("http://localhost:8000/customer", {
                method: "POST",
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
                .then(getCustomers)
        }
    }

    //Render Customer form
    return (
        <>
            <DialogTitle id="form-dialog-title">Add A New Product</DialogTitle>
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
                    label="Name of Customer"
                    type="text"
                    fullWidth
                />
                <TextField
                    required
                    onChange={handlePhone}
                    margin="dense"
                    id="price"
                    type="text"
                    label="Phone Number"
                    fullWidth
                />
                <TextField
                    required
                    margin="dense"
                    onChange={handleCity}
                    id="description"
                    type="text"
                    label="Description"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCustClose} color="primary">
                    Cancel
                </Button>
                <Button
                    onClick={() => {
                        postCustomer()
                        handleCustClose()
                    }}
                    color="primary"
                >
                    Submit
                </Button>
            </DialogActions>
        </>
    )
}
export default CustomerForm
