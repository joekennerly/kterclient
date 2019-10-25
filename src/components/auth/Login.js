import React, { useRef } from "react"
import { withRouter } from "react-router-dom"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import "./Login.css"

const Login = props => {
    const username = useRef()
    const password = useRef()
    const { login } = useSimpleAuth()

    // Simplistic handler for login submit
    const handleLogin = e => {
        e.preventDefault()

        /*
            For now, just store the username and password that
            the customer enters into local storage.
        */
        const credentials = {
            username: username.current.value,
            password: password.current.value
        }

        login(credentials).then(() => {
            props.history.push({
                pathname: "/"
            })
        })
    }

    return (
        <form className="form--login" onSubmit={handleLogin}>
            <h1>Please sign in</h1>
            <fieldset>
                <label htmlFor="inputEmail"> Username </label>
                <input
                    ref={username}
                    type="text"
                    className="form-control"
                    placeholder="username"
                    required
                    autoFocus
                />
            </fieldset>
            <fieldset>
                <label htmlFor="password"> Password </label>
                <input
                    ref={password}
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    required
                />
            </fieldset>
            <fieldset>
                <button type="submit">Sign in</button>
            </fieldset>
        </form>
    )
}
export default withRouter(Login)
