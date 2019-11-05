import React, {useState, useEffect} from "react"
import { Route } from "react-router-dom"
import "./App.css"
import ApplicationViews from "./ApplicationViews"
import Navbar from "./nav/Navbar"

const App = () => {
    const [user, setUser] = useState([])
    const getUser = () =>
        fetch("http://localhost:8000/vendor", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Token ${localStorage.getItem("kter_token")}`
            }
        })
            .then(response => response.json())
            .then(user => {
                setUser(user)
            })
    useEffect(()=>{getUser()}, [])

    return (
        <section className="App-header">
            <Route render={props => <Navbar {...props} user={user} />} />
            <span className="App-views">
                <ApplicationViews />
            </span>
        </section>
    )
}

export default App
