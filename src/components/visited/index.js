import React from 'react'
import './index.css'

class Visited extends React.Component {

  state = {
    city: '',
  }

  updateCity = e => {
    this.setState({city: e.target.value})
  }

  clearInput = () => {
    this.setState({ city: '' })
  }

  render(){
    return(
      <div>
        <h4> My visited Counties </h4>
        <p> You have been to {this.props.countries.length} / {this.props.totalCountries.length} countries</p>
        {this.props.countries.map(country => (
          <div className="countryWrapper">
            <div className="styledVisitedCountry">
              <p className="countryName"> {country.name} </p>
              <button onClick={() => this.props.toggleVisited(country.alpha2Code, 'visited')}> Remove </button>
              <input
                placeholder="Enter a city visited here"
                onChange={(e) => this.updateCity(e)}
                value={this.state.city}
              />
                <button onClick={() => this.props.submitVisitedCity(country.alpha2Code, this.state.city)}> Submit city </button>
                <button onClick={() => this.props.toggleShowingCities(country.alpha2Code, 'showCities')}> Toggle Cities </button>
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
