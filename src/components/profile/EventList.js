import React from "react"
import { Link } from "react-router-dom"

export default function EventList(props) {
    return (
        <>
            {props.orders.map(order => (
                <div key={order.id}>
                    <Link to={`/order/${order.id}`}>{order.location}</Link>
                </div>
            ))}
        </>
    )
}
