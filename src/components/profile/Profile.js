import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./Profile.css"

export default function Profile() {
    const [user, setUser] = useState([])
    const getUser = () => {
        fetch("http://localhost:8000/vendor", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Token ${localStorage.getItem("kter_token")}`
            }
        })
            // Convert to JSON
            .then(response => response.json())

            // Store itinerary items in state variable
            .then(user => {
                setUser(user)
            })
    }
    useEffect(getUser, [])
    return user.map(vendor => (
        <section
            key={vendor.id}
            id="profile"
        >
            <h1>Welcome {vendor.user.first_name}</h1>
            <Link to="#">Manage Inventory</Link>
            <Link to="#">Add Event</Link>
        </section>
    ))
}
