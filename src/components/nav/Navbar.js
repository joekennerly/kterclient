import React from "react"
import { Link } from "react-router-dom"
import "./Navbar.css"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import { Menu } from 'semantic-ui-react'

const Navbar = () => {
    const { isAuthenticated, logout } = useSimpleAuth()
    return (
        <Menu inverted>
            <Menu.Item as={Link} className="nav-link" to="/">
                Home
            </Menu.Item>
            {isAuthenticated() ? (
                <>
                    <Menu.Item as={Link}className="nav-link" to="/profile">
                        Profile
                    </Menu.Item>
                    <Menu.Menu position='right'>
                    <Menu.Item as={Link}
                        to="/"
                        className="nav-link fakeLink"
                        onClick={() => {
                            logout()
                        }}
                    >
                        Logout
                    </Menu.Item>
                    </Menu.Menu>
                </>
            ) : (
                <>
                    <Menu.Menu position='right'>
                    <Menu.Item as={Link} className="nav-link" to="/login">
                        Login
                    </Menu.Item>
                    <Menu.Item as={Link}className="nav-link" to="/register">
                        Register
                    </Menu.Item>
                    </Menu.Menu>
                </>
            )}
        </Menu>
    )
}
export default Navbar
