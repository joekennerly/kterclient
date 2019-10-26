import React from "react"
import { Link } from "react-router-dom"
import "./Navbar.css"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"

const Navbar = props => {
    const { isAuthenticated, logout } = useSimpleAuth()
    return (
        <div id="Navbar">
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
                    <Link className="nav-link" to="/login">
                        Login
                    </Link>
                    <Link className="nav-link" to="/register">
                        Register
                    </Link>
                </>
            )}
        </div>
    )
}
export default Navbar
