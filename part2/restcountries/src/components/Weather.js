import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Weather = ({name, capital}) => {
    const [weather, setWeather] = useState(null)

    console.log(process.env.REACT_APP_API_KEY)

    useEffect(() => {
        axios
        .get('http://api.weatherstack.com/current', {
            params: {
                access_key: process.env.REACT_APP_API_KEY,
                query: `${capital}, ${name}`
            }
        })
        .then(response => 
            setWeather(response.data))
    }, [capital, name])

    console.log('weather ', weather)

    if (weather){
        return (
            <div>
                <h1>Current weather in {capital}</h1>
                <div><b>Temperature:</b> {weather.current.temperature} Celsius</div>
                <img src={weather.current.weather_icons[0]} alt=""></img>
                <div>{weather.current.weather_descriptions[0]}</div>
                <div><b>Wind:</b> {weather.current.wind_speed} mph {weather.current.wind_dir}</div>
            </div>
        )
    }
    else return (
        <div>
        </div>
    )
}

export default Weather