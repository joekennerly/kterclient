import React, { useState, useEffect } from "react"

//Commented code will be removed if image upload doesn't pan out
//Can add from the backend, not sure how to send that in a post/put
//https://coleruche.com/post/uploading-images-to-REST-API-backend-in-React-JS/
//https://www.django-rest-framework.org/api-guide/parsers/

const ProductDetail = props => {
    const [product, setProducts] = useState([])
    // const [image, setImage] = useState({})

    // const image = useRef()

    // const handleImageChange = (e) => {
    //     setImage({image: e.target.files[0]})
    // }

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     console.log(image)
    //     let form_data = new FormData()
    //     form_data.append('image', image)
    //     fetch(`http://localhost:8000/product/${props.productId}`, {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type": "multipart/form-data",
    //             Authorization: `Token ${localStorage.getItem("kter_token")}`
    //         }
    //     })
    //         .then(response => response.data)
    // }

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
        fetch(`http://localhost:8000/product/${id}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                Authorization: `Token ${localStorage.getItem("kter_token")}`
            }
        }).then(() => props.history.push("/profile"))
    }

    useEffect(() => {
        getProduct(props.productId)
    }, [props.productId])

    return (
        <>
            <h3>{product.name}</h3>
            <h5>${product.price}</h5>
            <p>Description: {product.description}</p>
            {/* <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    id="image"
                    accept="image/png, image/jpeg"
                    onChange={handleImageChange}
                    // ref={image}
                />
                <input type="submit" />
            </form>
            {product.image ? (
                <img alt="product" src={product.image} width="360" />
            ) : (
                <div />
            )} */}
            <button
                onClick={() => {
                    if (window.confirm("Are you sure?")) {
                        deleteItem(product.id)
                    }
                }}
            >
                Delete
            </button>
            <button
                onClick={() => {
                    props.history.push(`/product/${product.id}/edit`)
                }}
            >
                Edit
            </button>
        </>
    )
}
export default ProductDetail
