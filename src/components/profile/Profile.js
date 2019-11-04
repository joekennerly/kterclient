import React, { useEffect, useState } from "react"
import "./Profile.css"
import { Link } from "react-router-dom"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ProductForm from "./ProductForm"
import ProductList from "./ProductList"
import CustomerList from "./CustomerList"
import CustomerForm from "./CustomerForm"

export default function Profile() {
    const [user, setUser] = useState([])
    const [products, setProducts] = useState([])
    const [customers, setCustomers] = useState([])
    const [confirmed, setConfirmed] = useState([])

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

    const getConfirmed = () =>
        fetch("http://localhost:8000/order", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Token ${localStorage.getItem("kter_token")}`
            }
        })
            .then(response => response.json())
            .then(confirmed => {
                setConfirmed(confirmed)
            })

    useEffect(() => {
        getUser()
        getProducts()
        getCustomers()
        getConfirmed()
    }, [])

    return (
        <>
            {user.map(vendor => (
                <section key={vendor.id} id="profile">
                    <h1>Welcome {vendor.user.first_name}</h1>
                </section>
            ))}
            <h3>Confirmed Orders</h3>
            {confirmed.map(order => {
                return (
                    <Link
                        key={order.id}
                        to={`/order/${order.id}/${order.customer_id}`}
                    >
                        {order.payment ? (
                            <p style={{ color: "red" }}>
                                {order.location} {order.start.slice(0, 10)}
                            </p>
                        ) : (
                            <p>
                                {order.location} {order.start.slice(0, 10)}
                            </p>
                        )}
                    </Link>
                )
            })}
            <section className="manage">
                <article className="sub-manage">
                    <ProductForm getProducts={getProducts} />
                    <ProductList
                        products={products}
                        getProducts={getProducts}
                    />
                </article>
                <article className="sub-manage">
                    <CustomerForm getCustomers={getCustomers} />
                    <CustomerList
                        customers={customers}
                        getCustomers={getCustomers}
                    />
                </article>
            </section>
        </>
    )
}
