import React from 'react'

const Output = ({persons}) => {
    return (
        <ul>
            {persons.map(person =>
                <li key={person.name}>{person.name} {person.number}</li>
                )}
        </ul>
    )
}

export default Output