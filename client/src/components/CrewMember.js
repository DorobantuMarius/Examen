import { useState } from "react"

function CrewMember(props) {
    const { item, onDelete, onSave } = props
    const [isEditing, setIsEditing] = useState(false)

    const [Name, setName] = useState(item.Name)
    const [Role, setRole] = useState(item.Role)

    const deleteCrewMember = (evt) => {
        onDelete(item.MovieId, item.CrewMemberId)
    }

    const updateCrewMember = (evt) => {
        onSave(item.MovieId, {
            Name,
            Role
        }, item.CrewMemberId)
        setIsEditing(false)
    }

    const edit = () => {
        setIsEditing(true)
    }

    const cancel = () => {
        setIsEditing(false)
    }


    return (
        <div>
            {
                isEditing
                    ? (
                        <>
                            Name:
                            <input type='text' value={Name} onChange={(evt) => setName(evt.target.value)} />
                            | Role:
                            <input type='text' value={Role} onChange={(evt) => setRole(evt.target.value)} />
                            <input type='button' value='Salveaza' onClick={updateCrewMember}></input>
                            <input type='button' value='Anuleaza' onClick={cancel}></input>
                        </>
                    )
                    : (
                        <>
                            Name: {item.Name} | Role: {item.Role}
                            <input type='button' value='Sterge' onClick={deleteCrewMember} style={{ marginLeft: '1em' }}></input>
                            <input type='button' value='Editeaza' onClick={edit} ></input>
                        </>
                    )
            }
        </div>
    )
}

export default CrewMember