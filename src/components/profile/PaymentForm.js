import React, { useRef } from "react"
import "./Profile.css"

const PaymentForm = props => {
    //Input Refs
    const merchant_name = useRef()
    const account_number = useRef()
    const expiration = useRef()

    const postPayment = () => {
        if (
            merchant_name.current.value === "" ||
            account_number.current.value === "" ||
            expiration.current.value === ""
        ) {
            window.alert("Please fill out all form fields")
        } else {
            fetch("http://localhost:8000/payment", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Token ${localStorage.getItem("kter_token")}`
                },
                body: JSON.stringify({
                    customer_id: +props.customerId,
                    merchant_name: merchant_name.current.value,
                    account_number: account_number.current.value,
                    expiration: expiration.current.value
                })
            })
                .then(() => {
                    merchant_name.current.value = ""
                    account_number.current.value = ""
                    expiration.current.value = ""
                })
                .then(props.getPayments)
        }
    }

    return (
        <div className="form">
            <h3>Add a payment</h3>
            <input
                required
                ref={merchant_name}
                type="text"
                placeholder="merchant name"
                autoFocus
            />
            <input
                required
                ref={account_number}
                type="text"
                placeholder="account number"
            />
            <input
                required
                ref={expiration}
                type="date"
                placeholder="expires"
            />
            <button onClick={postPayment}>Submit</button>
        </div>
    )
}
export default PaymentForm
