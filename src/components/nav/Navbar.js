import React from "react"
import { Link } from "react-router-dom"
import "./Navbar.css"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"

const Navbar = () => {
    const { isAuthenticated, logout } = useSimpleAuth()
    return (
        <>
            <Link className="nav-link" to="/">
                Home
            </Link>
            {isAuthenticated() ? (
                <>
                    <Link className="nav-link" to="/profile">
                        Profile
                    </Link>
                    <Link
                        to="/"
                        className="nav-link fakeLink"
                        onClick={() => {
                            logout()
                        }}
                    >
                        Logout
                    </Link>
                </>
            ) : (
                <>
                    <Link  className="nav-link" to="/login">
                        Login
                    </Link>
                    <Link className="nav-link" to="/register">
                        Register
                    </Link>
                </>
            )}
        </>
    )
}
export default Navbar
