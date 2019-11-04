import React, { useState } from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"

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

const Navbar = props => {
    const [anchorEl, setAnchorEl] = useState(null)
    const handleClick = event => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const classes = useStyles()
    const { isAuthenticated, logout } = useSimpleAuth()
    return (
        <>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        {isAuthenticated() ? (
                            <IconButton
                                edge="start"
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="menu"
                            >
                                <MenuIcon
                                    aria-controls="simple-menu"
                                    aria-haspopup="true"
                                    onClick={handleClick}
                                />
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem
                                        onClick={() => {
                                            props.history.push("/")
                                            handleClose()
                                        }}
                                    >
                                        Home
                                </MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            props.history.push("/profile")
                                            handleClose()
                                        }}
                                    >
                                        Profile
                                </MenuItem>
                                </Menu>
                            </IconButton>
                        ) : (<div/>)}
                        <Typography variant="h6" className={classes.title}>
                            Kter
                        </Typography>
                        {isAuthenticated() ? (
                            <Button
                                color="inherit"
                                    onClick={() => {
                                        logout()
                                        props.history.push("/")
                                    }}
                            >
                                Logout
                            </Button>
                        ) : (
                            <>
                            <Button
                                color="inherit"
                                onClick={() => props.history.push("/login")}
                            >
                                Login
                            </Button>
                            <Button
                                color="inherit"
                                onClick={() => props.history.push("/register")}
                            >
                                Register
                            </Button>
                            </>
                        )}
                    </Toolbar>
                </AppBar>
            </div>
        </>
    )
}
export default Navbar
