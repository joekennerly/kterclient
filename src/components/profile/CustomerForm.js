import React, { useRef } from "react"
import "./Profile.css"

const CustomerForm = (props) => {
    //Input Refs
    const name = useRef()
    const phone = useRef()
    const city = useRef()

    //Post a product, then set refs back to ""
    const postCustomer = () => {
        if (name.current.value === "" || phone.current.value === "" || city.current.value === "") {
            window.alert("Please fill out all form fields")
        }
        else {
            fetch('http://localhost:8000/customer', {
            "method": "POST",
            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("kter_token")}`
            },
            body: JSON.stringify({
                "name": name.current.value,
                "phone": phone.current.value,
                "city": city.current.value,
            })
            }).then(() => {
            name.current.value = ""
            phone.current.value = ""
            city.current.value = ""
        }).then(props.getCustomers)
        }
    }

    //Render Product form
    return (
        <div className="form">
            <h3>Add a customer</h3>
            <input
                required
                ref={name}
                type="text"
                placeholder="name"
                autoFocus
            />
            <input
                required
                ref={phone}
                type="text"
                placeholder="phone number"
            />
            <input
                required
                ref={city}
                type="text"
                placeholder="city"
            />
            <button onClick={postCustomer}>Submit</button>
        </div>
    )
}
export default CustomerForm