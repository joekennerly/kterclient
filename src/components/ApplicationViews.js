import React from "react"
import { Route, Redirect } from "react-router-dom"
import { withRouter } from "react-router"
import Register from "./auth/Register"

const ApplicationViews = () => (
    <>
        <Route
            path="/register"
            render={props => <Register />}
        />
    </>
)

export default withRouter(ApplicationViews)
