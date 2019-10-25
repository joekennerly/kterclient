import React from "react"

const handleLogin = () => console.log("login clicked")

const Login = () =>
    <>
        <h1>login form</h1>
        <input type="text" placeholder="username"/>
        <input type="password" placeholder="password"/>
        <button onClick={handleLogin}>Login</button>
    </>

export default Login