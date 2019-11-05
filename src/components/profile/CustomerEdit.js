import React, { useRef } from "react"
import "./Profile.css"

const CustomerEdit = (props) => {
    const { customer, getCustomer, handleCloseEdit } = props

    const name = useRef()
    const phone = useRef()
    const city = useRef()

    const postCustomer = (id) => {
        if (name.current.value === "" || phone.current.value === "" || city.current.value === "") {
            window.alert("Please fill out all form fields")
        }
        else {
            fetch(`http://localhost:8000/customer/${id}`, {
            "method": "PUT",
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
        }).then(()=>getCustomer(customer.id))
        }
    }

    return (
        <div className="form">
            <h3>Edit customer</h3>
            <input
                required
                ref={name}
                type="text"
                defaultValue={customer.name}
                autoFocus
            />
            <input
                required
                ref={phone}
                type="text"
                defaultValue={customer.phone}
            />
            <input
                required
                ref={city}
                type="text"
                defaultValue={customer.city}
            />
            <button onClick={() => {
                postCustomer(customer.id)
                handleCloseEdit()
            }}>Submit</button>
        </div>
    )
}
export default CustomerEdit