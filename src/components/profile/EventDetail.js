import React, { useState, useEffect } from "react"
import EventProducts from "./EventProducts"

const EventDetail = props => {
    const [order, setOrders] = useState([])
    const [products, setProducts] = useState([])

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

    const deleteItem = id => {
        fetch(`http://localhost:8000/order/${id}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                Authorization: `Token ${localStorage.getItem(
                    "kter_token"
                )}`
            }
        }).then(()=>props.history.push('/profile'))
    }

    useEffect(() => {
        getOrders(props.eventId)
        getProducts(props.eventId)
    }, [props.eventId])

    console.log(products)
    return (
        <>
            <h3>{order.location}</h3>
            {products.map(product => {
                return <div key={product.id}>{product.product.name}</div>
            })}
            <button
                onClick={() => {
                    if (window.confirm("Are you sure?")) {
                        deleteItem(order.id)
                        props.history.push('/profile')
                    }
                }}
            >
                Delete
            </button>

            <EventProducts orderId={order.id} getProducts={getProducts} products={props.products}/>
        </>
    )
}
export default EventDetail
