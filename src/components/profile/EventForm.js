import React, { useRef } from "react"
import "./Profile.css"

const EventForm = props => {
    //Input Refs
    const start = useRef()
    const end = useRef()
    const location = useRef()

    //Post a product, then set refs back to ""
    const postProduct = () => {
        if (
            start.current.value === "" ||
            end.current.value === "" ||
            location.current.value === ""
        ) {
            window.alert("Please fill out all form fields")
        } else {
            fetch("http://localhost:8000/order", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Token ${localStorage.getItem("kter_token")}`
                },
                body: JSON.stringify({
                    customer_id: +props.customerId,
                    start: start.current.value,
                    end: end.current.value,
                    location: location.current.value
                })
            })
                .then(() => {
                    start.current.value = ""
                    end.current.value = ""
                    location.current.value = ""
                })
                .then(props.getOrders)
        }
    }

    //Render Product form
    return (
        <div className="form">
            <h3>Add an event</h3>
            <input
                required
                ref={start}
                type="date"
                placeholder="name"
                autoFocus
            />
            <input required ref={end} type="date" placeholder="end" />
            <input
                required
                ref={location}
                type="text"
                placeholder="location"
            />
            <button onClick={postProduct}>Submit</button>
        </div>
    )
}
export default EventForm
