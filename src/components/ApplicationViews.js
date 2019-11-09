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
    const [payments, setPayments] = useState([])

    const getPayments = () =>
        fetch("http://localhost:8000/payment", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Token ${localStorage.getItem("kter_token")}`
            }
        })
            .then(response => response.json())
            .then(payments => {
                setPayments(payments)
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
        getPayments()
    }, [])


    return (
        <>
            <Route path="/register" render={props => <Register />} />
            <Route path="/login" render={props => <Login />} />
            <Route exact path="/" render={props => <Home {...props}/>} />
            <Route exact path="/profile" render={props => <Profile categories={categories} products={products} getProducts={getProducts}/>} />
            <Route
                exact
                path="/product/:productId(\d+)"
                render={props => {
                    const productId = +props.match.params.productId
                    const product = products.filter(product=> product.id === productId)
                    const category = categories.filter(category=> category.id === product.productcategory_id)
                    return <ProductDetail {...props} category={category} productId={productId} products={products} getProducts={getProducts}/>
                }}
            />
            <Route
                exact
                path="/product/:productId(\d+)/edit"
                render={props => {
                    const productId = +props.match.params.productId
                    const prod = products.filter(product=>product.id === productId)
                    return <ProductEdit {...props} product={prod} productId={productId} getProducts={getProducts}/>
                }}
            />
            <Route
                exact
                path="/customer/:customerId(\d+)"
                render={props => {
                    const customerId = +props.match.params.customerId
                    return <CustomerDetail {...props} customerId={customerId} getCustomers={getCustomers} />
                }}
            />
            <Route
                exact
                path="/payment/:paymentId(\d+)"
                render={props => {
                    const paymentId = +props.match.params.paymentId
                    const pay = payments.filter(payment=>payment.id === paymentId)
                    return <PaymentDetail {...props} getPayments={getPayments} payment={pay} paymentId={paymentId} />
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
                            eventId={eventId}
                            customerId={customerId}
                            customer={cust}
                            prods={products}
                            getProds={getProducts}
                        />
                    )
                }}
            />
        </>
    )
}

export default withRouter(ApplicationViews)
