import React from "react"
import { Route } from "react-router-dom"
// import { Route, Redirect } from "react-router-dom"
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

const ApplicationViews = () => (
    <>
        <Route path="/register" render={props => <Register />} />
        <Route path="/login" render={props => <Login />} />
        <Route exact path="/" render={props => <Home />} />
        <Route exact path="/profile" render={props => <Profile />} />
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
                return <ProductEdit {...props} productId={productId} />
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
            path="/order/:eventId(\d+)"
            render={props => {
                const eventId = +props.match.params.eventId
                return <EventDetail {...props} eventId={eventId} />
            }}
        />
    </>
)

export default withRouter(ApplicationViews)
