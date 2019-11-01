import React from "react"
import { Route } from "react-router-dom"
import "./App.css"
import ApplicationViews from "./ApplicationViews"
import Navbar from "./nav/Navbar"

const App = () => (
    <section className="App-header">
        <Route render={props => <Navbar {...props} />} />
        <span className="App-views"><ApplicationViews /></span>
    </section>
)

export default App
