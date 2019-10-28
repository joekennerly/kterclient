import React, {useRef} from 'react'
import "./Profile.css"

export default function ProductForm() {
    const name = useRef()
    const productcategory = useRef()
    const price = useRef()
    const description = useRef()

    const makeObject = () => {
        let object = {
            name:name.current.value,
            productcategory:productcategory.current.value,
            price:price.current.value,
            description:description.current.value
        }
        console.log(object)
    }

    return (
        <div id="productform">
            <h1>Product Form</h1>
            <input required ref={name} type="text" placeholder="name" autoFocus/>
            <input required ref={productcategory} type="text" placeholder="productcategory" />
            <input required ref={price} type="text" placeholder="price" />
            <input required ref={description} type="text" placeholder="description" />
            <button onClick={makeObject}>Submit</button>
        </div>
    )
}
