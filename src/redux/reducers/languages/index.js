const initialState = {
  current: 'en',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_TO_FRENCH':
      return {
        ...state,
        current: 'fr',
      }
    default:
      return state
  }
}
