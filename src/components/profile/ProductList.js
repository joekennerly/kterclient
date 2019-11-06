import React from "react"
import { Link } from "react-router-dom"

export default function ProductList(props) {
    return (
        <ul>
            {props.products.map(product => (
                <li key={product.id}><Link to={`/product/${product.id}`}>{product.name}</Link></li>
            ))}
        </ul>
    )
}
