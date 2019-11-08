import React from "react"
import { Link } from "react-router-dom"
import moment from "moment"

export default function EventList(props) {
    return (
        <>
            {props.orders.map(order => (
                <div key={order.id}>
                    <Link to={`/order/${order.id}/${props.customer.id}`}>{moment(order.start).format('MMM Do')} {order.location}</Link>
                </div>
            ))}
        </>
    )
}
