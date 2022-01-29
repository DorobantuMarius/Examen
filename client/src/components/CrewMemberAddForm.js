import { useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from "react"
import crewMemberStore from "./CrewMemberStore"

function CrewMemberAddForm(props) {
    const { onAdd } = props
    const [crewMembers, setCrewMembers] = useState([])
    const [Name, setName] = useState('')
    const [Role, setRole] = useState('')

    const { movieId } = useParams();

    useEffect(() => {
        crewMemberStore.getCrewMembers(movieId)
        crewMemberStore.emitter.addListener('Success!', () => {
            setCrewMembers(crewMemberStore.data)
        })
    }, [])

    const addCrewMember = (evt) => {
        onAdd(movieId, {
            Name,
            Role
        })
    }

    useEffect(() => {
        return () => { }
    }, []);

    return (
        <div>
            <h4>Adauga un crew member</h4>
            <div>
                <input type='text' placeholder='Name' onChange={(evt) => setName(evt.target.value)} />
            </div>
            <div>
                <input type='text' placeholder='Role' onChange={(evt) => setRole(evt.target.value)} />
            </div>
            <div>
                <input type='button' value='Adauga' onClick={addCrewMember} />
            </div>
        </div>
    )
}

export default CrewMemberAddForm