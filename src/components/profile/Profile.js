import React, { useEffect, useState } from "react"
import "./Profile.css"
import ProductForm from "./ProductForm"
import ProductList from "./ProductList"
import EventForm from "./EventForm"

export default function Profile() {
    const [user, setUser] = useState([])
    const [products, setProducts] = useState([])

    const getUser = () =>
        fetch("http://localhost:8000/vendor", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Token ${localStorage.getItem("kter_token")}`
            }
        })
            .then(response => response.json())
            .then(user => {
                setUser(user)
            })

    const getProducts = () =>
        fetch("http://localhost:8000/product?vendor=current", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Token ${localStorage.getItem("kter_token")}`
            }
        })
            .then(response => response.json())
            .then(products => {
                setProducts(products)
            })

    useEffect(() => {
        getUser()
        getProducts()
    }, [])

    return (
        <>
            {user.map(vendor => (
                <section key={vendor.id} id="profile">
                    <h1>Welcome {vendor.user.first_name}</h1>
                </section>
            ))}
            <ProductForm getProducts={getProducts} />
            <ProductList products={products} getProducts={getProducts} />
            <EventForm />
        </>
    )
}
