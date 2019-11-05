import React, { useState, useEffect } from "react"

const PaymentDetail = props => {
    const [payment, setPayments] = useState([])
    console.log(payment)

    const getPayment = paymentId => {
        fetch(`http://localhost:8000/payment/${paymentId}`, {
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
        fetch(`http://localhost:8000/payment/${id}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                Authorization: `Token ${localStorage.getItem(
                    "kter_token"
                )}`
            }
        }).then(()=>props.history.push(`/customer/${payment.customer_id}`))
    }

    useEffect(() => {
        getPayment(props.paymentId)
    }, [props.paymentId])

    return (
        <>
            <h3>{payment.merchant_name}</h3>
            <h5>{payment.account_number}</h5>
            <p>{payment.expiration}</p>
            <button
                onClick={() => {
                    if (window.confirm("Are you sure?")) {
                        deleteItem(payment.id)
                    }
                }}
            >
                Delete
            </button>
        </>
    )
}
export default PaymentDetail
