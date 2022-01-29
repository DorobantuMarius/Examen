import { EventEmitter } from "fbemitter"

const SERVER = 'http://localhost:8080'

class MovieStore {
    constructor() {
        this.data = []
        this.emitter = new EventEmitter()
    }

    async getMovies() {
        try {
            const response = await fetch(`${SERVER}/api/sequelize/movies`)
            if (!response.ok) {
                throw response
            }
            this.data = await response.json()
            this.emitter.emit('Success!')
        } catch (err) {
            console.warn(err)
            this.emitter.emit('Error!!!')
        }
    }

    async addMovie(movie) {
        try {
            const response = await fetch(`${SERVER}/api/sequelize/movies`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movie)
            })
            if (!response.ok) {
                throw response
            }
            this.getMovies()
        } catch (err) {
            console.warn(err)
            this.emitter.emit('Error!!!')
        }
    }

    async updateMovie(id, movie) {
        try {
            const response = await fetch(`${SERVER}/api/sequelize/movies/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movie)
            })
            if (!response.ok) {
                throw response
            }
            this.getMovies()
        } catch (err) {
            console.warn(err)
            this.emitter.emit('Error!!!')
        }
    }

    async deleteMovie(id) {
        try {
            const response = await fetch(`${SERVER}/api/sequelize/movies/${id}`, {
                method: 'DELETE'
            })
            if (!response.ok) {
                throw response
            }
            this.getMovies()
        } catch (err) {
            console.warn(err)
            this.emitter.emit('Error!!!')
        }
    }
}

const store = new MovieStore()
export default store