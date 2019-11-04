import React from "react"
import { Link } from "react-router-dom"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import "./Navbar.css"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
// import MenuIcon from "@material-ui/icons/Menu"

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    }
}))

const Navbar = () => {
    const classes = useStyles()
    const { isAuthenticated, logout } = useSimpleAuth()
    return (
        <>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="menu"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </div>
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
        </>
    )
}
export default Navbar
