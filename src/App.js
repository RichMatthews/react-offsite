import React, { Component } from 'react'
import axios from 'axios'
import './App.css'
import Visited from './components/visited'

class App extends Component {

  state = {
    country: '',
    countries: []
  }

  componentDidMount(){
    axios.get('https://restcountries.eu/rest/v2/all').then((data) => {
      const updatedCountries = data.data.map((country) => {
        return {...country, visited: false}
      })
      this.setState({countries: updatedCountries})
    })
  }

  handleChange = e => {
    this.setState({country: e.target.value})
  }

  toggleVisited = countryCode => {
    var countries = [...this.state.countries]
    var countryToChange = countries.find(country => country.alpha2Code === countryCode)
    countryToChange.visited = !countryToChange.visited
    this.setState({countryToChange});
  }

  render() {
    const filteredCountries = this.state.countries.filter(country => country.name.toLowerCase().includes(this.state.country))
    const visitedCountries = this.state.countries.filter(country => country.visited)
    return (
      <div>
        <p> Search for a country </p>
        <input onChange={e => this.handleChange(e)}/>
          <div className="container">
          {filteredCountries.map(country => (
            <div className={`countryContainer ${country.visited ? 'visited' : ''}`}>
              <img src={country.flag} />
              <p className="countryName"> {country.name} </p>
              <button onClick={() => this.toggleVisited(country.alpha2Code)}>{country.visited ? 'unvisited' : 'visited'}</button>
            </div>
          ))}
          </div>
          <div>
            <h4> My visited Counties </h4>
            <Visited countries={visitedCountries} totalCountries={this.state.countries}/>
          </div>
      </div>
    );
  }
}

export default App;
