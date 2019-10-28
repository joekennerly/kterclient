import React, { useRef, useState, useEffect } from "react"
import "./Profile.css"

export default function ProductForm(props) {
    //Get category resource and set it as category state
    const [category, setCategory] = useState([])
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
    useEffect(getCategory, [])

    //Input Refs
    const name = useRef()
    const productcategory = useRef()
    const price = useRef()
    const description = useRef()

    //Post a product, then set refs back to ""
    const postProduct = () => {
        if (name.current.value === "" || productcategory.current.value === "0" || price.current.value === "" || description.current.value === "") {
            window.alert("Please fill out all form fields")
        }
        else {
            fetch('http://localhost:8000/product', {
            "method": "POST",
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
        }).then(props.getProducts)
        }
    }

    //Render Product form
    return (
        <div id="productform">
            <h1>Product Form</h1>
            <input
                required
                ref={name}
                type="text"
                placeholder="name"
                autoFocus
            />
            <select
                ref={productcategory}
                name="category"
                required
                defaultValue="0"
            >
                <option value='0'>
                    Select Category
                </option>
                {category.map(category => {
                    return <option key={category.id} value={category.id}>{category.name}</option>
                })}
            </select>
            <input required ref={price} type="number" placeholder="price" />
            <input
                required
                ref={description}
                type="text"
                placeholder="description"
            />
            <button onClick={postProduct}>Submit</button>
        </div>
    )
}
