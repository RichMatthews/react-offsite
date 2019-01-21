import React from 'react'

import './index.css'

const Countries = ({ countries, toggleVisited }) => (
  <div>
    <h4> All Countries </h4>
    <div className="container">
      {countries.map((country, index) => (
        <div key={index} className={`countryContainer ${country.visited ? 'visited' : ''}`}>
          <img src={country.flag} alt="countryFlag" />
          <p className="countryName"> {country.name} </p>
          <button onClick={() => toggleVisited(country.name)}>
            {country.visited ? 'undo' : 'visited'}
          </button>
        </div>
      ))}
    </div>
  </div>
)

export default Countries
