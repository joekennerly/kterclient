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
    </>
)

export default withRouter(ApplicationViews)
