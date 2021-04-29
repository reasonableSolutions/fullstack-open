import React from 'react'

const Output = ({data}) => {
    if (data.length > 10) {
        return (
            <div>
                Too many matches, specify another filter.
            </div>
        )
    }
    else if (data.length > 1) {
        return (
            <>
                {data.map(entry => <div key={entry.alpha3Code}>{entry.name}</div>)}
            </>
        )
    }
    else if (data.length === 1){
        return (
            <div>
                <h1>{data[0].name}</h1>
                <div>capital {data[0].capital}</div>
                <div>population {data[0].population}</div>
                <h1>Languages</h1>
                <ul>
                    {data[0].languages.map(language => <li key={language.iso639_2}>{language.name}</li>)}
                </ul>
                <div>
                    <img src={data[0].flag} alt={`flag of ${data[0].name}`}></img>
                </div>
            </div>
        )
    }
    else if (data.length === 0){
        return (
            <div>
                No matches found.
            </div>
        )
    }
}

export default Output