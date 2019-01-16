import React from 'react'
import './index.css'

const Countries = props => (
  <div>
    <h4> All Countries </h4>
    <div className="container">
      {props.countries.map((country, index) => (
        <div key={index} className={`countryContainer ${country.visited ? 'visited' : ''}`}>
          {/* <img src={country.flag} /> */}
          <p className="countryName"> {country.name} </p>
          <button onClick={() => props.toggleVisited(country.alpha2Code, 'visited')}>
            {country.visited ? 'undo' : 'visited'}
          </button>
        </div>
      ))}
    </div>
  </div>
)

export default Countries
