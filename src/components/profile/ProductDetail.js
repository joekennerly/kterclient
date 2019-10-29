import React,{useState, useEffect} from "react"

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

    useEffect(() => {
        getProduct(props.productId)
    }, [props.productId])

    console.log(product)
    return (
        <>
            <h3>{product.name}</h3>
            <h5>${product.price}</h5>
            <p>Description: {product.description}</p>
        </>
    )
}
export default ProductDetail
