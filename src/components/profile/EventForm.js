import React, { useState } from "react"
import "./Profile.css"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import moment from "moment"

const EventForm = props => {
  const { customerId, getOrders, handleCloseEv } = props
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")
  const [location, setLocation] = useState("")

  const handleStart = e => setStart(e.target.value)
  const handleEnd = e => setEnd(e.target.value)
  const handleLocation = e => setLocation(e.target.value)

  const postEvent = () => {
    if (start === "" || end === "" || location === "") {
      window.alert("Please fill out all form fields")
    } else if (moment(start).isSameOrBefore(moment().format())) {
      window.alert("The event must not be today or in the past")
    } else if (moment(end).isSameOrBefore(moment(start))) {
      window.alert("The end of the event may not occur before the beginning")
    } else {
      fetch("http://127.0.0.1:8000/order", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("kter_token")}`
        },
        body: JSON.stringify({
          customer_id: +customerId,
          start,
          end,
          location
        })
      })
        .then(() => {
          setStart("")
          setEnd("")
          setLocation("")
        })
        .then(() => {
          getOrders()
          handleCloseEv()
        })
    }
  }

  return (
    <>
      <DialogTitle id="form-dialog-title">Add An Event</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Choose when and where the event will be held
        </DialogContentText>
        <TextField
          required
          id="start"
          onChange={handleStart}
          margin="dense"
          label="Start Date and Time"
          type="datetime-local"
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          required
          id="end"
          onChange={handleEnd}
          margin="dense"
          label="End Date and Time"
          type="datetime-local"
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          required
          onChange={handleLocation}
          margin="dense"
          id="location"
          type="text"
          label="Location"
          fullWidth
        />
        <DialogActions>
          <Button onClick={handleCloseEv} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              postEvent()
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
export default EventForm
