import React from "react"
import { Link } from "react-router-dom"

export default function ProductList(props) {
    return (
        <>
            {props.products.map(product => (
                <Link key={product.id} to={`/product/${product.id}`}>{product.name}</Link>
            ))}
        </>
    )
}
