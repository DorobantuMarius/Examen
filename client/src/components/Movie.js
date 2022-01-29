import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Movie(props) {
    const { item, onDelete, onSave } = props
    const [isEditing, setIsEditing] = useState(false)

    const [Title, setTitle] = useState(item.Title)
    const [Date, setDate] = useState(item.Date)

    const deleteMovie = (evt) => {
        onDelete(item.MovieId)
    }

    const updateMovie = (evt) => {
        onSave(item.MovieId, {
            Title,
            Date
        })
        setIsEditing(false)
    }

    const edit = () => {
        setIsEditing(true)
    }

    const cancel = () => {
        setIsEditing(false)
    }

    const navigate = useNavigate();
    let showCrewMembers = () => {
        navigate(`/${item.MovieId}/crewMembers`)
    }

    return (
        <div>
            {
                isEditing
                    ? (
                        <>
                            Title:
                            <input type='text' value={Title} onChange={(evt) => setTitle(evt.target.value)} />
                            | Date:
                            <input type='text' value={Date} onChange={(evt) => setDate(evt.target.value)} />
                            <input type='button' value='Salveaza' onClick={updateMovie}></input>
                            <input type='button' value='Anuleaza' onClick={cancel}></input>
                        </>
                    )
                    : (
                        <>
                            Title: {item.Title} | Date: {item.Date}
                            <input type='button' value='Sterge' onClick={deleteMovie} style={{ marginLeft: '1em' }}></input>
                            <input type='button' value='Editeaza' onClick={edit}></input>
                            <input type='button' value='CrewMembers' onClick={showCrewMembers}></input>
                        </>
                    )
            }
        </div>
    )
}

export default Movie