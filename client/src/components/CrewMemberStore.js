import { EventEmitter } from "fbemitter"

const SERVER = 'http://localhost:8080'

class CrewMemberStore {
    constructor() {
        this.data = []
        this.emitter = new EventEmitter()
    }

    async getCrewMembers(movieId) {
        try {
            const response = await fetch(`${SERVER}/api/sequelize/movies/${movieId}/crewMembers`)
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

    async addCrewMember(movieId, crewMember) {
        try {
            const response = await fetch(`${SERVER}/api/sequelize/movies/${movieId}/crewMembers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(crewMember)
            })
            if (!response.ok) {
                throw response
            }
            this.getCrewMembers(movieId)
        } catch (err) {
            console.warn(err)
            this.emitter.emit('Error!!!')
        }
    }

    async updateCrewMember(movieId, crewMember, crewMemberId) {
        try {
            const response = await fetch(`${SERVER}/api/sequelize/movies/${movieId}/crewMembers/${crewMemberId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(crewMember)
            })
            if (!response.ok) {
                throw response
            }
            this.getCrewMembers(movieId)
        } catch (err) {
            console.warn(err)
            this.emitter.emit('Error!!!')
        }
    }

    async deleteCrewMember(movieId, crewMemberId) {
        try {
            const response = await fetch(`${SERVER}/api/sequelize/movies/${movieId}/crewMembers/${crewMemberId}`, {
                method: 'DELETE'
            })
            console.log(response)
            if (!response.ok) {
                throw response
            }
            this.getCrewMembers(movieId)
        } catch (err) {
            console.warn(err)
            this.emitter.emit('Error!!!')
        }
    }
}

const crewMemberStore = new CrewMemberStore()
export default crewMemberStore