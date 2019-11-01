import React, { useState, useEffect, useRef } from "react"
import EventProducts from "./EventProducts"

const EventDetail = props => {
    const [order, setOrders] = useState([])
    const [products, setProducts] = useState([])
    const [payments, setPayments] = useState([])

    const payment = useRef()

    const getOrders = eventId => {
        fetch(`http://localhost:8000/order/${eventId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Token ${localStorage.getItem("kter_token")}`
            }
        })
            .then(response => response.json())
            .then(event => {
                setOrders(event)
            })
    }

    const getProducts = eventId => {
        fetch(`http://localhost:8000/orderproduct?order_id=${eventId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Token ${localStorage.getItem("kter_token")}`
            }
        })
            .then(response => response.json())
            .then(products => {
                setProducts(products)
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
        fetch(`http://localhost:8000/order/${id}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                Authorization: `Token ${localStorage.getItem("kter_token")}`
            }
        }).then(() => props.history.push(`/customer/${props.customerId}`))
    }

    const handleConfirm = orderId => {
        if (payment.current.value === "0") {
            window.alert("Please select a payment")
        } else {
            fetch(`http://localhost:8000/order/${orderId}`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Token ${localStorage.getItem("kter_token")}`
                },
                body: JSON.stringify({ payment_id: +payment.current.value })
            }).then(() => {
                payment.current.value = "0"
            })
        }
    }

    useEffect(() => {
        getOrders(props.eventId)
        getProducts(props.eventId)
        getPayments(props.customerId)
    }, [props.eventId, props.customerId])

    return (
        <>
            <h3>{order.location}</h3>
            <button
                onClick={() => {
                    if (window.confirm("Are you sure?")) {
                        deleteItem(order.id)
                    }
                }}
            >
                Delete Order
            </button>
            {products.map(product => {
                return (
                    <div key={product.id}>
                        {product.product.name} {product.product.price}
                    </div>
                )
            })}
            <h3>Select Payment</h3>
            <select ref={payment} name="payment" required defaultValue="0">
                <option value="0">Select Payment</option>
                {payments.map(payment => {
                    return (
                        <option key={payment.id} value={payment.id}>
                            {payment.merchant_name}
                        </option>
                    )
                })}
            </select>
            <button
                onClick={() => {
                    handleConfirm(order.id, payment)
                }}
            >
                Confirm Order
            </button>
            <h3>Add Products</h3>
            <EventProducts
                orderId={order.id}
                getProducts={getProducts}
                products={props.products}
            />
        </>
    )
}
export default EventDetail
