import React from "react"

export default function EventProducts(props) {
    const addProduct = (orderId, productId) => {
        fetch("http://localhost:8000/orderproduct", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("kter_token")}`
            },
            body: JSON.stringify({
                order_id: orderId,
                product_id: productId
            })
        }).then(()=>props.getProducts(orderId))
    }
    return (
        <>
            {props.products.map(product => (
                <div key={product.id}>
                    {product.name}{" "}
                    <button
                        onClick={() => addProduct(props.orderId, product.id)}
                    >
                        +
                    </button>
                </div>
            ))}
        </>
    )
}
