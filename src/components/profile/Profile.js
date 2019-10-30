import React, { useEffect, useState } from "react"
import "./Profile.css"
import ProductForm from "./ProductForm"
import ProductList from "./ProductList"
import EventForm from "./EventForm"
import CustomerList from "./CustomerList"
import CustomerForm from "./CustomerForm"

export default function Profile() {
    const [user, setUser] = useState([])
    const [products, setProducts] = useState([])
    const [customers, setCustomers] = useState([])

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

    const getCustomers = () =>
        fetch("http://localhost:8000/customer?vendor=current", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Token ${localStorage.getItem("kter_token")}`
            }
        })
            .then(response => response.json())
            .then(customers => {
                setCustomers(customers)
            })

    useEffect(() => {
        getUser()
        getProducts()
        getCustomers()
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
            <CustomerForm getCustomers={getCustomers} />
            <CustomerList customers={customers} getCustomers={getCustomers} />
            <EventForm />
        </>
    )
}
