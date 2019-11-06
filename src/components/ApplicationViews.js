import React, { useState, useEffect } from "react"
import { Route } from "react-router-dom"
import { withRouter } from "react-router"
import Register from "./auth/Register"
import Login from "./auth/Login"
import Profile from "./profile/Profile"
import Home from "./home/Home"
import ProductDetail from "../components/profile/ProductDetail"
import ProductEdit from "../components/profile/ProductEdit"
import CustomerDetail from "../components/profile/CustomerDetail"
import PaymentDetail from "../components/profile/PaymentDetail"
import EventDetail from "../components/profile/EventDetail"

const ApplicationViews = () => {
    const [products, setProducts] = useState([])
    const [customers, setCustomers] = useState([])
    const [categories, setCategories] = useState([])
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

    const getCategories = () =>
        fetch("http://localhost:8000/category", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Token ${localStorage.getItem("kter_token")}`
            }
        })
            .then(response => response.json())
            .then(categories => {
                setCategories(categories)
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
        getProducts()
        getCustomers()
        getCategories()
    }, [])


    return (
        <>
            <Route path="/register" render={props => <Register />} />
            <Route path="/login" render={props => <Login />} />
            <Route exact path="/" render={props => <Home />} />
            <Route exact path="/profile" render={props => <Profile categories={categories} getProducts={getProducts}/>} />
            <Route
                exact
                path="/product/:productId(\d+)"
                render={props => {
                    const productId = +props.match.params.productId
                    return <ProductDetail {...props} productId={productId} />
                }}
            />
            <Route
                exact
                path="/product/:productId(\d+)/edit"
                render={props => {
                    const productId = +props.match.params.productId
                    const prod = products.filter(product=>product.id === productId)
                    return <ProductEdit {...props} product={prod} productId={productId} />
                }}
            />
            <Route
                exact
                path="/customer/:customerId(\d+)"
                render={props => {
                    const customerId = +props.match.params.customerId
                    return <CustomerDetail {...props} customerId={customerId} />
                }}
            />
            <Route
                exact
                path="/payment/:paymentId(\d+)"
                render={props => {
                    const paymentId = +props.match.params.paymentId
                    return <PaymentDetail {...props} paymentId={paymentId} />
                }}
            />
            <Route
                exact
                path="/order/:eventId(\d+)/:customerId(\d+)"
                render={props => {
                    const eventId = +props.match.params.eventId
                    const customerId = +props.match.params.customerId
                    const cust = customers.filter(customer=>customer.id === customerId)
                    return (
                        <EventDetail
                            {...props}
                            products={products}
                            eventId={eventId}
                            customerId={customerId}
                            customer={cust}
                        />
                    )
                }}
            />
        </>
    )
}

export default withRouter(ApplicationViews)
