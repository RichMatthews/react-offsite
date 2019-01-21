import React, { Component } from 'react'
import axios from 'axios'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import './index.css'
import { updateInitialCountries, toggleCountry, updateShowingCity, updateCityVisited } from 'redux/action-creators/countries'
import Visited from 'components/visited'
import Countries from 'components/countries'

class Main extends Component {

  constructor(props) {
   super(props);

   this.state = {
     country: '',
     showCountries: true
   }
  }

  componentDidMount(){
    axios.get('http://localhost:3007/countries').then(({data}) => {
      this.props.updateInitialCountries(data)
    })
  }

  handleChange = e => {
    this.setState({country: e.target.value})
  }

  toggleShowingCountries = () => {
    this.setState({showCountries: !this.state.showCountries})
  }

  render() {
    const filteredCountries = this.props.countries.filter(country => country.name.toLowerCase().includes(this.state.country))
    const visitedCountries = this.props.countries.filter(country => country.visited)
    const { countries, toggleCountry, updateCityVisited, updateShowingCity } = this.props
    return (
      <div>
        <h3> Countries </h3>
        <p> Search for a country </p>
        <input onChange={e => this.handleChange(e)}/>
        <button onClick={this.toggleShowingCountries}> Hide Countries </button>
          <div>
            {this.state.showCountries ?
              <Countries
                countries={filteredCountries}
                toggleVisited={toggleCountry}
              />
              :
              null
            }
            <Visited
              countries={visitedCountries}
              totalCountries={countries}
              toggleVisited={toggleCountry}
              submitVisitedCity={updateCityVisited}
              toggleShowingCities={updateShowingCity}
            />
          </div>
      </div>
    );
  }
}

const mapStateToProps = ({ countries }) => ({
  countries,
})

const mapDispatchToProps = dispatch => bindActionCreators({ updateInitialCountries, toggleCountry, updateShowingCity, updateCityVisited }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Main);
