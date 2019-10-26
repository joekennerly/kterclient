import React from "react"
import { Route } from "react-router-dom"
// import { Route, Redirect } from "react-router-dom"
import { withRouter } from "react-router"
import Register from "./auth/Register"
import Login from "./auth/Login"
import Profile from "./profile/Profile"
import Home from "./home/Home"

const ApplicationViews = () => (
    <>
        <Route
            path="/register"
            render={props => <Register />}
        />
        <Route
            path="/login"
            render={props => <Login />}
        />
        <Route
            exact
            path="/"
            render={props => <Home />}
        />
        <Route
            exact
            path="/profile"
            render={props => <Profile />}
        />
    </>
)

export default withRouter(ApplicationViews)
