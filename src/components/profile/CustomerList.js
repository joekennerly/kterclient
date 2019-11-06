import React from "react"
import { Link } from "react-router-dom"

export default function CustomerList(props) {
    return (
        <ul>
            {props.customers.map(customer => (
                <li key={customer.id}><Link to={`/customer/${customer.id}`}>{customer.name}</Link></li>
            ))}
        </ul>
    )
}