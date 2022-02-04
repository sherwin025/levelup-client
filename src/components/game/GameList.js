import React, { useEffect, useState } from "react"
import { DeleteGame, getGames } from "./GameManager.js"
import { useHistory } from "react-router-dom"
export const GameList = (props) => {
    const [games, setGames] = useState([])
    const history = useHistory()

    useEffect(() => {
        GetAll()
    }, [])

    const deleteGame = (id) => {
        DeleteGame(parseInt(id))
        .then(GetAll)
    }

    const GetAll = () => {
        getGames().then(data => setGames(data))
    }

    return (<>
        <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
                history.push("/games/new")
            }}
        >Register New Game</button>
        <article className="games">
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.title} by {game.maker}</div>
                        <div className="game__players">{game.num_of_players} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                        <button onClick={()=>history.push(`./games/update/${game.id}`)}>update game</button>
                        <button onClick={()=>{deleteGame(game.id)}}>Delete Game</button>
                    </section>
                })
            }
        </article>
    </>
        )
}