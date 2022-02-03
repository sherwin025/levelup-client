import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getEvents } from "./EventManager";


export const EventList = (props) => {
    const [events, setevents] = useState([])
    const history = useHistory()

    useEffect(()=>{
        getEvents().then(res => setevents(res))
    }, [])

    return <>
            <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
                history.push("/events/new")
            }}
        >Register New Event</button>
        <div>
            Events:
            {
                events.map(event => {
                    return <div key={`event--${event.id}`}>
                        <div>{event.description}</div>
                        <div>We will be playing: {event.game.title}</div>
                        <div>Will be played on: {event.date}</div>
                        <div>@ {event.time}</div>
                        <div>Hosted by: {event.organizer.bio}</div>
                        <div></div>
                    </div>
                })
            }
        </div>
    </>
}