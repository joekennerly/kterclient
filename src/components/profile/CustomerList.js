import React from "react"
import { Link } from "react-router-dom"

export default function CustomerList(props) {
    return (
        <>
            {props.customers.map(customer => (
                <Link key={customer.id} to={`/customer/${customer.id}`}>{customer.name}</Link>
            ))}
        </>
    )
}