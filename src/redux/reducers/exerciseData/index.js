import { SET_CURRENT_EXERCISE } from '../../types'

const initialState = {
  current: '',
  searched: false
}

const getLatestWeightLifted = exercise => {
  const what = exercise.previousWeights.sort((a, b) => {
    return b.date - a.date
  })
  return what[0].weight
}

export default(state = initialState, action) => {
  switch(action.type){
    case SET_CURRENT_EXERCISE:
      return {
        ...state,
        current: {...action.exercise, lastWeightLifted: getLatestWeightLifted(action.exercise)} || '',
        searched: true
      }
    default:
      return state;
  }
}
