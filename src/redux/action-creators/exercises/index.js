import axios from 'axios'
import { SET_CURRENT_EXERCISE } from 'redux/types'

export const searchForExercise = exercise => {
  return dispatch => {
    axios({
      method: 'get',
      url: 'http://localhost:3007/exercises',
    }).then(data => {
      const foundExercise = data.data.filter(
        ex => ex.name.toLowerCase() === exercise.value.toLowerCase()
      )
      dispatch(setCurrentExercise(foundExercise[0]))
    })
  }
}

const setCurrentExercise = exercise => {
  return {
    type: SET_CURRENT_EXERCISE,
    exercise,
  }
}
