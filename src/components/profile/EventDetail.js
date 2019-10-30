import React, { useState, useEffect } from "react"

const EventDetail = props => {
    const [order, setOrders] = useState([])

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
    }, [props.eventId])

    return (
        <>
            <h3>{order.location}</h3>
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
        </>
    )
}
export default EventDetail
