import React from 'react'

const InputForm = ({newName, handleName, newNumber, handleNumber, handleAdd}) => {
    return (
        <div>
            <form>
                <div>
                name: <input value={newName} onChange={handleName}/>
                </div>
                <div>
                number: <input value={newNumber} onChange={handleNumber}/>
                </div>
                <div>
                <button type="submit" onClick={handleAdd}>add</button>
                </div>
            </form>
        </div>
    )
}

export default InputForm