import React from 'react'

const EventForm = () => {

    const addEvent = () => {
        console.log("cool!")
    }

    return (
        <div className="form">
            <h3>Event Form</h3>
            <input type="text" placeholder="start" />
            <input type="text" placeholder="end" />
            <input type="text" placeholder="location" />
            <button onClick={addEvent}>Submit</button>
        </div>
    )
}
export default EventForm