import { useState } from "react"
import "./style.css";

function MovieAddForm(props) {
    const { onAdd } = props
    const [Title, setTitle] = useState('')
    const [Date, setDate] = useState('')

    const addMovie = (evt) => {
        onAdd({
            Title,
            Date
        })
    }

    return (
        <div>
            <h4>Adauga un film</h4>
            <div>
                <input type='text' placeholder='Title' onChange={(evt) => setTitle(evt.target.value)} />
            </div>
            <div>
                <input type='text' placeholder='Date' onChange={(evt) => setDate(evt.target.value)} />
            </div>
            <div>
                <input type='button' value='Adauga' onClick={addMovie} />
            </div>
        </div>
    )
}

export default MovieAddForm