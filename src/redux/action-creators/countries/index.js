import axios from 'axios'

export const toggleCountry = countryName => {
  return (dispatch, getState) => {
    dispatch({ type: 'UPDATE_COUNTRY_VISITED', countryName })
    dispatch(saveStateToServer(getState().countries))
  }
}

export const updateInitialCountries = countries => {
  return (dispatch, getState) => {
    dispatch({ type: 'UPDATE_INITIAL_COUNTRIES', countries})
  }
}

export const saveStateToServer = countries => {
  return (dispatch) => {
    axios({
      method: 'post',
      url: 'http://localhost:3007/countries',
      data: {
        allCountries: countries,
      },
    })
  }
}

export const updateShowingCity = country => {
  return {
    type: 'UPDATE_SHOWING_CITY',
    country,
  }
}

export const updateCityVisited = (country, city) => {
  return {
    type: 'UPDATE_CITIES_VISITED',
    country,
    city,
  }
}
