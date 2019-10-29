import React from "react"
import { Route } from "react-router-dom"
// import { Route, Redirect } from "react-router-dom"
import { withRouter } from "react-router"
import Register from "./auth/Register"
import Login from "./auth/Login"
import Profile from "./profile/Profile"
import Home from "./home/Home"
import ProductDetail from "../components/profile/ProductDetail"

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
    </>
)

export default withRouter(ApplicationViews)
