import React from 'react'
import './index.css'

class Visited extends React.Component {

  state = {
    city: '',
  }

  updateCity = e => {
    this.setState({city: e.target.value})
  }

  render(){
    const { countries, totalCountries } = this.props
    return(
      <div>
        <h4> My visited Counties </h4>
        <p> You have been to {countries.length} / {totalCountries.length} countries</p>
        {this.props.countries.map(country => (
          <div className="countryWrapper">
            <div className="styledVisitedCountry">
              <img src={country.flag} alt="countryFlag" />
              <p className="countryName"> {country.name} </p>
              <button onClick={() => this.props.toggleVisited(country.name)}> Remove </button>
              <input
                placeholder="Enter a city visited here"
                onChange={(e) => this.updateCity(e)}
              />
                <button onClick={() => this.props.submitVisitedCity(country.name, this.state.city)}> Submit city </button>
                <button onClick={() => this.props.toggleShowingCities(country.name)}> Toggle Cities </button>
              </div>
              <div className="cityWrapper">
                {country.showCities ? <h3> Cities visited <div> {country.cities.map(city => <div> {city} </div>)} </div> </h3>  : null}
              </div>
          </div>
        ))}
      </div>
    )
  }
}

export default Visited
