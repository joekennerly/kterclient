import React from 'react'
import Product from "./Product"

export default function ProductList(props) {
    return (
        <>
            {props.products.map(product=><Product key={product.id} getProducts={props.getProducts} product={product} />)}
        </>
    )
}
