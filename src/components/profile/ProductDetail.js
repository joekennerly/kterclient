import React, { useState, useEffect } from "react"

const ProductDetail = props => {
    const [product, setProducts] = useState([])

    const getProduct = productId => {
        fetch(`http://localhost:8000/product/${productId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Token ${localStorage.getItem("kter_token")}`
            }
        })
            .then(response => response.json())
            .then(product => {
                setProducts(product)
            })
    }

    const deleteItem = id => {
        // Fetch data from localhost:8000/itineraryitems
        fetch(`http://localhost:8000/product/${id}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                Authorization: `Token ${localStorage.getItem(
                    "kter_token"
                )}`
            }
        })
            // Redirect back to profile
            // .then(() => getItem())
    }

    useEffect(() => {
        getProduct(props.productId)
    }, [props.productId])

    return (
        <>
            <h3>{product.name}</h3>
            <h5>${product.price}</h5>
            <p>Description: {product.description}</p>
            <button
                onClick={() => {
                    if (window.confirm("Are you sure?")) {
                        deleteItem(product.id)
                        props.history.push('/profile')
                    }
                }}
            >
                Delete
            </button>
        </>
    )
}
export default ProductDetail
