import { useEffect, useState } from "react";
import store from './MovieStore';
import MovieAddForm from './MovieAddForm'
import Movie from "./Movie";

function MovieList() {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        store.getMovies()
        store.emitter.addListener('Success!', () => {
            setMovies(store.data)
        })
    }, [])

    const addMovie = (movie) => {
        store.addMovie(movie)
    }

    const deleteMovie = (id) => {
        store.deleteMovie(id)
    }

    const updateMovie = (id, movie) => {
        store.updateMovie(id, movie)
    }

    useEffect(() => {
        return () => { }
    }, []);

    return (
        <div>
            <h4>Lista filme</h4>
            {
                movies.map(e => <Movie key={e.MovieId} item={e} onDelete={deleteMovie} onSave={updateMovie} />)
            }
            <MovieAddForm onAdd={addMovie} />
        </div>
    )
}

export default MovieList;