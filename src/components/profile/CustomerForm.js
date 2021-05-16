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
            fetch("http://127.0.0.1:8000/customer", {
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
                .then(() => {
                    getCustomers()
                    handleCustClose()
                })
        }
    }

    //Render Customer form
    return (
        <>
            <DialogTitle id="form-dialog-title">Add A New Contact</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    This person will be added to your list of contacts.
                </DialogContentText>
                <TextField
                    autoFocus
                    required
                    onChange={handleName}
                    margin="dense"
                    id="name"
                    label="Name of Contact"
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
                    id="city"
                    type="text"
                    label="City"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCustClose} color="primary">
                    Cancel
                </Button>
                <Button
                    onClick={postCustomer}
                    color="primary"
                >
                    Submit
                </Button>
            </DialogActions>
        </>
    )
}
export default CustomerForm
