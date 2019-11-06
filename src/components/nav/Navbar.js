import React from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"

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
  const { user } = props

  const classes = useStyles()
  const { isAuthenticated, logout } = useSimpleAuth()
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {isAuthenticated() ? (
            <>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={() => props.history.push("/profile")}

              >
                <MenuIcon aria-controls="simple-menu" aria-haspopup="true" />
              </IconButton>
            </>
          ) : (
            <div />
          )}
          <Typography variant="h6" className={classes.title}>
            K TER
          </Typography>
          {isAuthenticated() ? (
            <>
              {user.map(vendor => (
                <Typography key={vendor.id} id="profile">
                  Signed in as {vendor.user.first_name} {vendor.user.last_name}
                </Typography>
              ))}
              <Button
                color="inherit"
                onClick={() => {
                  logout()
                  props.history.push("/")
                }}
              >
                Logout
              </Button>
            </>
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
  )
}
export default Navbar
