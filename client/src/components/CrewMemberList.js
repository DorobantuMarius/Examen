import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import crewMemberStore from './CrewMemberStore'
import CrewMember from './CrewMember'
import CrewMemberAddForm from "./CrewMemberAddForm";

function CrewMemberList() {
    const navigate = useNavigate();
    const [crewMembers, setCrewMembers] = useState([])
    const { movieId } = useParams();

    useEffect(() => {
        crewMemberStore.getCrewMembers(movieId)
        crewMemberStore.emitter.addListener('Success!', () => {
            setCrewMembers(crewMemberStore.data)
        })
    }, [])

    const addCrewMember = (movieId, crewMember) => {
        crewMemberStore.addCrewMember(movieId, crewMember)
    }

    const deleteCrewMember = (movieId, id) => {
        crewMemberStore.deleteCrewMember(movieId, id)
    }

    const updateCrewMember = (movieId, crewMember, id) => {
        crewMemberStore.updateCrewMember(movieId, crewMember, id)
    }

    useEffect(() => {
        return () => { }
    }, []);

    return (
        <div>
            <h4>Lista echipa</h4>
            {
                crewMembers.map(e => <CrewMember key={e.CrewMemberId} item={e} onDelete={deleteCrewMember} onSave={updateCrewMember} />)
            }
            <CrewMemberAddForm onAdd={addCrewMember} movieId />
            <br></br>
            <input type='button' value='Inapoi' onClick={() => navigate('/')} />
        </div>
    )
}

export default CrewMemberList