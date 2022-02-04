import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { getGameTypes, getSingleGame, UpdateGame } from "./GameManager"

export const UpdateGameForm = () => {
    const { gameid } = useParams()
    const [game, setgame] = useState({})
    const [gameTypes, setgametypes] = useState([])
    const history = useHistory()

    useEffect(() => {
        getSingleGame(parseInt(gameid)).then(res => setgame(res))
        getGameTypes().then(res => setgametypes(res))
    }, [gameid])


    const changeGameState = (domEvent) => {
        let copy = game
        copy[domEvent.target.name] = domEvent.target.value
        setgame(copy)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        defaultValue={game.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        defaultValue={game.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Number of Players: </label>
                    <input type="text" name="num_of_players" required autoFocus className="form-control"
                        defaultValue={game.num_of_players}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Skill level: </label>
                    <input type="text" name="skill_level" required autoFocus className="form-control"
                        defaultValue={game.skill_level}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Game Type: </label>
                    <select type="text" name="game_type" required autoFocus className="form-control"
                        onChange={changeGameState}>
                        <option>Select a type</option>
                        {
                            gameTypes.map(type => {
                                if (game.game_type?.id === type.id) {
                                    return <option value={type.id} selected>{type.label}</option>
                                } else {
                                    return <option value={type.id}>{type.label}</option>
                                }
                            })
                        }
                    </select>
                </div>
            </fieldset>


            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()
                    if (game.game_type?.id) {
                        const Agame = {
                            id: game.id,
                            maker: game.maker,
                            title: game.title,
                            num_of_players: parseInt(game.num_of_players),
                            skill_level: parseInt(game.skill_level),
                            game_type: parseInt(game.game_type?.id)
                        }
                        UpdateGame(Agame)
                            .then(() => history.push("/games"))
                    } else {
                        const Agame = {
                            id: game.id,
                            maker: game.maker,
                            title: game.title,
                            num_of_players: parseInt(game.num_of_players),
                            skill_level: parseInt(game.skill_level),
                            game_type: parseInt(game.game_type)
                        }
                        UpdateGame(Agame)
                            .then(() => history.push("/games"))
                    }

                    // Send POST request to your API
                }}
                className="btn btn-primary">Update Game</button>
        </form>
    )
}