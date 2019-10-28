import React, { useRef, useState, useEffect } from "react"
import "./Profile.css"

export default function ProductForm() {
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

    const name = useRef()
    const productcategory = useRef()
    const price = useRef()
    const description = useRef()

    const makeObject = () => {
        let object = {
            name: name.current.value,
            productcategory: productcategory.current.value,
            price: price.current.value,
            description: description.current.value
        }
        console.log(object)
    }

    //Make a selection input for category!!!
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
                <option disabled value='0'>
                    Select Category
                </option>
                {category.map(category => {
                    return <option key={category.id} value={category.id}>{category.name}</option>
                })}
            </select>

            <input required ref={price} type="text" placeholder="price" />
            <input
                required
                ref={description}
                type="text"
                placeholder="description"
            />
            <button onClick={makeObject}>Submit</button>
        </div>
    )
}
