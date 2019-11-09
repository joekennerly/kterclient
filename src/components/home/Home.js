import React from "react"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"

export default function Home(props) {
    const { isAuthenticated } = useSimpleAuth()
    return (
        <div style={{textAlign: "center"}}>
            <Typography variant="h1">Welcome to K TER</Typography>
            <Typography variant="h4">The event managment tool for catering companies</Typography>
            {isAuthenticated() ? (
                <Button variant="outlined" onClick={()=>props.history.push("/profile")}>Get Started</Button>
            ) : (
                <Button variant="outlined" onClick={()=>props.history.push("/register")}>Get Started</Button>
            )}
        </div>
    )
}