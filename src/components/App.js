import React from "react"
import { Route } from "react-router-dom"
import "./App.css"
import ApplicationViews from "./ApplicationViews"
import Navbar from "./nav/Navbar"

const App = () => (
    <header className="App-header">
        <Route render={props => <Navbar {...props} />} />
        <ApplicationViews />
    </header>
)

export default App
