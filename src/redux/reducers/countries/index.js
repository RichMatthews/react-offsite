const initialState = []

export default(state = initialState, action) => {
  switch(action.type){
    case 'UPDATE_INITIAL_COUNTRIES':
      return state.concat(action.countries)
    case 'UPDATE_COUNTRY_VISITED':
      return state.map(country => (
        country.name === action.countryName ? {...country, visited: !country.visited} : country
      ))
    case 'UPDATE_SHOWING_CITY':
      return state.map(country => (
        country.name === action.country ? {...country, showCities: !country.showCities} : country
      ))
    case 'UPDATE_CITIES_VISITED':
      return state.map(country => (
        country.name === action.country ? {...country, cities: country.cities.concat(action.city)} : country
      ))
    default:
      return state;
  }
}
