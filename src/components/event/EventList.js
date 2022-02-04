import { getAllByAltText } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { DeleteEvent, getEvents } from "./EventManager";


export const EventList = (props) => {
    const [events, setevents] = useState([])
    const history = useHistory()

    useEffect(()=>{
        GetAll()
    }, [])
    

    const deleteEvent = (id) => {
        DeleteEvent(parseInt(id))
        .then(GetAll)
    }

    const GetAll = () => {
        getEvents().then(res => setevents(res))
    }
    
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
                        <button onClick={()=>history.push(`./events/update/${event.id}`)}>Update Event</button>
                        <button onClick={()=>{deleteEvent(event.id)}}>Delete Event</button>
                        <div></div>
                    </div>
                })
            }
        </div>
    </>
}