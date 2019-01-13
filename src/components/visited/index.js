import React from 'react'

const Visited = (props) => (
  <div>
    <p> You have been to {props.countries.length} / {props.totalCountries.length} countries</p>
    {props.countries.map((country) => (
      <div className={country.flag}>
        <img src={country.flag} />
        <p className="countryName"> {country.name} </p>
      </div>
    ))}
  </div>
)

export default Visited
