import React from 'react'

const Output = ({persons, handleRemove}) => {
    return (
        <ul>
            {persons.map(person =>
                <li key={person.name}>{person.name} {person.number}<button onClick={() => handleRemove(person.id)}>delete</button></li>
            )}
        </ul>
    )
}

export default Output