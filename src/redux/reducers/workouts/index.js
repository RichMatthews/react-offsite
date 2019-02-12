import {
  SUBMIT_WORKOUT,
  SAVE_WORKOUT,
  TOGGLE_SHOWING_WORKOUT,
} from 'redux/types'

const initialState = {
  previousWorkouts: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_WORKOUT:
      return {
        ...state,
        previousWorkouts: state.previousWorkouts.concat({
          workoutExercises: action.workout,
          date: action.date,
        }),
      }
    case SAVE_WORKOUT:
      return {
        ...state,
        previousWorkouts: state.previousWorkouts
          .concat(state.previousWorkouts)
          .concat(action.workouts),
      }
    case TOGGLE_SHOWING_WORKOUT:
      return {
        ...state,
        previousWorkouts: state.previousWorkouts.map(workout =>
          workout.id === action.workout.id
            ? { ...workout, isShowing: !workout.isShowing }
            : workout
        ),
      }
    default:
      return state
  }
}
