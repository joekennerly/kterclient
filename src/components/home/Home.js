import React from "react"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"

export default function Home(props) {
    return (
        <div style={{textAlign: "center"}}>
            <Typography variant="h1">Welcome to K TER</Typography>
            <Typography variant="h4">The event managment tool for catering companies</Typography>
            <Button variant="outlined" onClick={()=>props.history.push("/register")}>Get Started</Button>
        </div>
    )
}