import React from "react"
import Customer from "./Customer"

export default function CustomerList(props) {
    return (
        <>
            {props.customers.map(customer => (
                <Customer
                    key={customer.id}
                    getCustomers={props.getCustomers}
                    customer={customer}
                />
            ))}
        </>
    )
}
