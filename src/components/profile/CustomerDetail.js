import React, { useState, useEffect } from "react"

const CustomerDetail = props => {
    const [customer, setCustomer] = useState([])

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

    const deleteItem = id => {
        fetch(`http://localhost:8000/customer/${id}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                Authorization: `Token ${localStorage.getItem(
                    "kter_token"
                )}`
            }
        })
    }

    useEffect(() => {
        getCustomer(props.customerId)
    }, [props.customerId])

    return (
        <>
            <h3>Name:{customer.name}</h3>
            <h5>Phone: {customer.phone}</h5>
            <p>City: {customer.city}</p>
            <button
                onClick={() => {
                    if (window.confirm("Are you sure?")) {
                        deleteItem(customer.id)
                        props.history.push('/profile')
                    }
                }}
            >
                Delete
            </button>
            <button
                onClick={() => {
                    console.log(customer.id, "button clicked")
                    props.history.push(`/customer/${customer.id}/edit`)
                }}
            >
                Edit
            </button>
        </>
    )
}
export default CustomerDetail
