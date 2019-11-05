import React from 'react'
import { Link } from "react-router-dom"

export default function AllOrders(props) {
    const { confirmed } = props
    return (
        <>
            <h3>Upcoming Events</h3>
            {confirmed.map(order => {
                return (
                    <Link
                        key={order.id}
                        to={`/order/${order.id}/${order.customer_id}`}
                    >
                        {order.payment ? (
                            <p style={{ color: "springgreen" }}>
                                {order.location} {order.start.slice(0, 10)}
                            </p>
                        ) : (
                            <p style={{ color: "tomato" }}>
                                {order.location} {order.start.slice(0, 10)}
                            </p>
                        )}
                    </Link>
                )
            })}
        </>
    )
}
