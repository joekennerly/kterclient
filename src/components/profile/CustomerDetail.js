import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import PaymentForm from './PaymentForm'

const CustomerDetail = props => {
    const [customer, setCustomer] = useState([])
    const [payments, setPayments] = useState([])

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
    }, [props.customerId])

    return (
        <>
            <button
                onClick={() => {
                    if (window.confirm("Are you sure?")) {
                        deleteItem(customer.id)
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
            <h3>Name:{customer.name}</h3>
            <h5>Phone: {customer.phone}</h5>
            <p>City: {customer.city}</p>
            <p>Payment Types</p>
            <ul>
                {payments.map(payment => (
                    <li key={payment.id}>
                        <Link to={`/payment/${payment.id}`}>
                            {payment.merchant_name}
                        </Link>
                    </li>
                ))}
            </ul>
            <PaymentForm getPayments={()=>getPayments(customer.id)} customerId={customer.id}/>
        </>
    )
}
export default CustomerDetail
