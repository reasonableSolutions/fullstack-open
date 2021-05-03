import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Output from './components/Output'
import Weather from './components/Weather'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ nameFilter, setNameFilter ] = useState('')

  const handleFilter = (event) => {
    setNameFilter(event.target.value)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => 
        setCountries(response.data))
  }, [])

  const countriesToShow = (nameFilter === '')
    ? countries
    : countries.filter(country =>
      country.name.match(RegExp(nameFilter, 'gi')) !== null)

  if (countriesToShow.length === 1){
    return (
      <div>
        <Filter nameFilter={nameFilter} handleFilter={handleFilter} />
        <Output data={countriesToShow} setFilter={setNameFilter}/>
        <Weather name={countriesToShow[0].name} capital={countriesToShow[0].capital}/>
      </div>
    )
  }

  else {
    return (
      <div>
        <Filter nameFilter={nameFilter} handleFilter={handleFilter} />
        <Output data={countriesToShow} setFilter={setNameFilter}/>
      </div>
    )
  }
}

export default App;
