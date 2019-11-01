import React, { useRef, useState, useEffect } from "react"
import "./Profile.css"

const ProductEdit = (props) => {
    //Get category resource and set it as category state
    const [category, setCategory] = useState([])
    const [product, setProduct] = useState([])
    const getCategory = () => {
        fetch('http://localhost:8000/category', {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("kter_token")}`
            }
        })
        .then(response => response.json())
        .then((categories) => {
            setCategory(categories)
        })
    }

    const getProduct = (productId) => {
        fetch(`http://localhost:8000/product/${productId}`, {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("kter_token")}`
            }
        })
        .then(response => response.json())
        .then((product) => {
            setProduct(product)
        })
    }

    useEffect(() => {
        getCategory()
        getProduct(props.productId)
    }, [props.productId])

    //Input Refs
    const name = useRef()
    const productcategory = useRef()
    const price = useRef()
    const description = useRef()


    //Post a product, then set refs back to ""
    const postProduct = (id) => {
        if (name.current.value === "" || productcategory.current.value === "0" || price.current.value === "" || description.current.value === "") {
            window.alert("Please fill out all form fields")
        }
        else {
            fetch(`http://localhost:8000/product/${id}`, {
            "method": "PUT",
            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("kter_token")}`
            },
            body: JSON.stringify({
                "name": name.current.value,
                "productcategory_id": +productcategory.current.value,
                "price": price.current.value,
                "description": description.current.value
            })
            }).then(() => {
            name.current.value = ""
            productcategory.current.value = "0"
            price.current.value = ""
            description.current.value = ""
        }).then(()=>props.history.push(`/product/${product.id}`))
        }
    }


    //Render Product form
    return (
        <div className="form">
            <h1>Edit Product</h1>
            <input
                required
                ref={name}
                type="text"
                defaultValue={product.name}
                autoFocus
            />
            <select
                ref={productcategory}
                name="category"
                required
                value={product.productcategory_id}
            >
                <option>
                    Select Category
                </option>
                {category.map(category => {
                    return <option key={category.id} value={category.id}>{category.name}</option>
                })}
            </select>
            <input
                required
                ref={price}
                type="number"
                defaultValue={product.price} />
            <input
                required
                ref={description}
                type="text"
                defaultValue={product.description}
            />
            <button onClick={()=>postProduct(product.id)}>Submit</button>
        </div>
    )
}
export default ProductEdit