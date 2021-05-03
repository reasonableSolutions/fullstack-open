import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Weather = ({name, capital, key}) => {
    const api_key = process.env.REACT_APP_API_KEY
    const [weather, setWeather] = useState({})

    useEffect(() => {
        let URL = 'http://api.weatherstack.com/current?access_key=' +
            api_key +
            '&query=' +
            capital +
            ',' +
            name
          console.log(URL)
          axios
            .get(URL)
            .then(response => 
              setWeather(response.data))
      }, [])

    console.log(
        `weather, 
        ${api_key}
        ${name}
        ${capital}`
    )
    
    if (weather === undefined){
        return (
            <>
            </>
        )
    }
    else return (
        <div>
                <h1>Current weather in {capital}</h1>
                <div><b>Temperature:</b> {weather.current.temperature} Celsius</div>
                <img src={weather.current.weather_icons[0]}></img>
                <div>{weather.current.weather_descriptions[0]}</div>
                <div><b>Wind:</b> {weather.current.wind_speed} mph {weather.current.wind_dir}</div>
            </div>
    )
}

export default Weather