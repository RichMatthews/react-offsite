import { combineReducers } from 'redux'
import workouts from './workouts'
import languages from './languages'
import exerciseData from './exerciseData'

const rootReducer = combineReducers({
  workouts,
  languages,
  exerciseData,
})

export default rootReducer
