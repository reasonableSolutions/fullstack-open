import React from 'react'

const Filter = ({nameFilter, handleFilter}) => {
    return (
        <div>
            Filter shown names by:
            <input value={nameFilter} onChange={handleFilter}/>
        </div>
    )
}

export default Filter