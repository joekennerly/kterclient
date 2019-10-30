import React from "react"
import { Link } from "react-router-dom"

const Customer = props => <Link to={`/customer/${props.customer.id}`}>{props.customer.name}</Link>

export default Customer