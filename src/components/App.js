import React from "react"
import "./App.css"
import ApplicationViews from "./ApplicationViews"
import Navbar from "./nav/Navbar"

const App = () => (
    <>
    <Navbar />
    <header className="App-header">
        <ApplicationViews />
    </header>
    </>
)

export default App
