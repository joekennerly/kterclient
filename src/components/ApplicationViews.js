import React from "react"
import { Route, Redirect } from "react-router-dom"
import { withRouter } from "react-router"
import Register from "./auth/Register"
import Login from "./auth/Login"

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
            render={props => <h1>Home page</h1>}
        />
    </>
)

export default withRouter(ApplicationViews)
