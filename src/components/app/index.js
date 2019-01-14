import React, { Component } from 'react'
import axios from 'axios'
import './index.css'
import Visited from '../../components/visited'
import Countries from '../../components/countries'

class App extends Component {

  constructor(props) {
   super(props);

   this.state = {
     country: '',
     countries: [],
     showCountries: true,
     countryToTest: '', // you need to use this state
     continent: '', // you need to use this state
   }

   this.toggleShowingCountries = this.toggleShowingCountries.bind(this)
  }

  componentDidMount(){
    axios.get('https://restcountries.eu/rest/v2/all').then((data) => {
      const updatedCountries = data.data.map((country) => {
        return {...country, visited: false, cities: [], showCities: false}
      })
      this.setState({countries: updatedCountries})
    })
  }

  setCountry = (e) => {
    // you need to manipulate the state here :)
  }

  whichContinent = () => {
    axios.get(`https://restcountries.eu/rest/v2/name/${'you need to fill in the correct information here'}`).then((response) => {
      console.log(response, 'check the data in the browser console if you are stuck')
    })
  }

  handleChange = e => {
    this.setState({country: e.target.value})
  }

  toggleShowingCountries() {
    this.setState({showCountries: !this.state.showCountries})
  }

  submitVisitedCity = (countryCode, city) => {
    this.setState(prevState => {
      const countries = prevState.countries.map(country => country.alpha2Code !== countryCode
        ? country : {
          ...country,
          cities: country.cities.concat(city)
        })
      const countryToChange = countries.find(country => country.alpha2Code === countryCode)

      return {
        countries,
        countryToChange
      }
    });
  }

  toggleParameter = (countryCode, changingKey) => {
    this.setState(prevState => {
      const countries = prevState.countries.map(country => country.alpha2Code !== countryCode
        ? country : {
          ...country,
          [changingKey]: !country[changingKey]
        })
      const countryToChange = countries.find(country => country.alpha2Code === countryCode)

      return {
        countries,
        countryToChange
      }
    });
  }

  render() {
    const filteredCountries = this.state.countries.filter(country => country.name.toLowerCase().includes(this.state.country))
    const visitedCountries = this.state.countries.filter(country => country.visited)
    return (
      <div>
        <h3> Countries </h3>
        <p> Search for a country </p>
        <input onChange={e => this.handleChange(e)}/>
        <input
          placeholder="type a country to find the continent"
          onChange={undefined} // you need to update the correct place so we can find the corret country
        />
        <button
          onClick={undefined} // you need to update the correct place so we call the correct function
        >
            Which continent ?
        </button>
        Continent: Europe {/* This is hardcoded at the moment, make sure you change it to show the correct continent */}
        <div><button onClick={this.toggleShowingCountries}> Hide Countries </button></div>
          <div>
            {this.state.showCountries ?
              <Countries
                countries={filteredCountries}
                toggleVisited={this.toggleParameter}
              />
              :
              null
            }
            <Visited
              countries={visitedCountries}
              totalCountries={this.state.countries}
              toggleVisited={this.toggleParameter}
              submitVisitedCity={this.submitVisitedCity}
              toggleShowingCities={this.toggleParameter}
            />
          </div>
      </div>
    );
  }
}

export default App;
