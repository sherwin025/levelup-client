import { useEffect, useState, useRef } from "react"
import { useHistory, useParams} from "react-router-dom/cjs/react-router-dom.min"
import { getSingleEvent, UpdateEvent } from "./EventManager"
import { getGames } from "../game/GameManager"

export  const UpdateEventForm = () => {
    const {eventid} = useParams()
    const [event, setevent] = useState([])
    const [games, setGames] = useState([])
    const description = useRef(null)
    const date = useRef(null)
    const time = useRef(null)
    const game = useRef(null)
    const history = useHistory()
    
    useEffect(()=>{
        getSingleEvent(parseInt(eventid)).then(res => setevent(res))
        getGames().then(res => setGames(res))
    }, [])

    const sendEvent = () => {
    UpdateEvent({
            id: parseInt(eventid),
            description: description.current.value,
            date: date.current.value,
            time: time.current.value,
            game: game.current.value
        })
        .then(() => history.push("/events"))
    }

    return (<>
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Event description: </label>
                    <input type="text" name="description" ref={description} defaultValue={event.description} required autoFocus className="form-control"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Date: </label>
                    <input type="date" name="date" ref={date} defaultValue={event.date} required autoFocus className="form-control"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Time: </label>
                    <input type="time" name="time" ref={time} defaultValue={event.time} required autoFocus className="form-control"
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Select a Game to play: </label>
                    <select type="text" name="game_id" ref={game} required autoFocus className="form-control">
                        <option>Select a Game</option>
                        {
                            games.map(type => {
                                if (event.game?.id === type.id){
                                    return <option value={type.id} selected >{type.title}</option>
                                } else {
                                    return <option value={type.id}>{type.title}</option>
                                }
                            })
                        }
                    </select>
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    sendEvent()
                }}
                className="btn btn-primary">Update Event</button>
        </form>
    </>)
}