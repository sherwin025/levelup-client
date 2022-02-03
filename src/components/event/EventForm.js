import react, { useEffect, useRef, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { getGames } from "../game/GameManager"
import { createEvent } from "./EventManager"

export const EventForm = () => {
    const [games, setGames] = useState([])
    const description = useRef(null)
    const date = useRef(null)
    const time = useRef(null)
    const game = useRef(null)
    const history = useHistory()


    useEffect(() => {
        getGames().then(res => setGames(res))
    }, [])

    const sendEvent = () => {
    createEvent({
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
                    <input type="text" name="description" ref={description} required autoFocus className="form-control"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Maker: </label>
                    <input type="date" name="date" ref={date} required autoFocus className="form-control"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Time: </label>
                    <input type="time" name="time" ref={time} required autoFocus className="form-control"
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Select a Game to play: </label>
                    <select type="text" name="game_id" ref={game} required autoFocus className="form-control">
                        <option>Select a type</option>
                        {
                            games.map(type => {
                                return <option value={type.id}>{type.title}</option>
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
                className="btn btn-primary">Create</button>
        </form>
    </>)
}