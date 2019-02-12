import {
  SAVE_WORKOUT,
  SUBMIT_WORKOUT,
  TOGGLE_SHOWING_WORKOUT,
} from 'redux/types'

import axios from 'axios'

export const submitWorkout = (workout, date) => {
  return (dispatch, getState) => {
    dispatch({ type: SUBMIT_WORKOUT, workout, date })
    dispatch(saveStateToServer(workout))
    dispatch(updateExerciseOnServer(workout))
  }
}

export const updateExerciseOnServer = workout => {
  return () => {
    axios({
      method: 'post',
      url: 'http://localhost:3007/exercises',
      data: {
        date: Date.now(),
        workoutExercises: workout,
      },
    })
  }
}

export const saveStateToServer = workout => {
  return () => {
    axios({
      method: 'post',
      url: 'http://localhost:3007/workouts',
      data: {
        date: Date.now(),
        workoutExercises: workout,
      },
    })
  }
}

export const fetchPreviousWorkouts = () => {
  return dispatch => {
    axios({
      method: 'get',
      url: 'http://localhost:3007/workouts',
    }).then(data => {
      dispatch(loadPreviousWorkoutsToStore(data.data))
    })
  }
}

const loadPreviousWorkoutsToStore = workouts => {
  return dispatch => {
    dispatch({ type: SAVE_WORKOUT, workouts })
  }
}

export const toggleShowingWorkout = workout => {
  return {
    type: TOGGLE_SHOWING_WORKOUT,
    workout,
  }
}
