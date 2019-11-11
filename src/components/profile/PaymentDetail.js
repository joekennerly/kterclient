import React, { useState, useEffect } from "react"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"

const PaymentDetail = props => {
    const [payment, setPayments] = useState([])

    const getPayment = paymentId => {
        fetch(`https://kterapi.herokuapp.com/payment/${paymentId}`, {
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
        fetch(`https://kterapi.herokuapp.com/payment/${id}`, {
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
            <Typography variant="h4">{payment.merchant_name}</Typography>
            <Typography variant="h6">{payment.account_number}</Typography>
            <Typography>{payment.expiration}</Typography>
            <Button variant="outlined" color="secondary"
                onClick={() => {
                    if (window.confirm("Are you sure?")) {
                        deleteItem(payment.id)
                    }
                }}
            >
                Delete
            </Button>
        </>
    )
}
export default PaymentDetail
