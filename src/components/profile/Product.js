import React from "react"

const Product = props => {
    return (
        <>
            <section>
                <button onClick={() => props.getProducts(props.product.id)}>
                    {props.product.name}
                </button>
            </section>
        </>
    )
}
export default Product
