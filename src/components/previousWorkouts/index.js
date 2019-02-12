import React, { Component } from 'react'
import {
  fetchPreviousWorkouts,
  toggleShowingWorkout,
} from 'redux/action-creators/workouts'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'
import styled from 'styled-components'

const Container = styled.div`
  box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 4px 0px;
  background: #e7e7e7;
  padding: 3px;
  margin-bottom: 10px;
`

const PreviousWorkoutContainer = styled.div`
  padding: 10px;
  margin-bottom: 1rem;
  background: #fff;
`

const TableHeading = styled.th`
  padding: 5px;
`

const TableData = styled.td`
  padding: 5px;
`

const WorkoutDate = styled.span`
  font-size: 15px;
`

class Main extends Component {
  componentDidMount() {
    this.props.fetchPreviousWorkouts()
  }

  render() {
    return (
      <Container>
        <h4> Previous workouts </h4>
        {this.props.workouts.previousWorkouts.map((workout, index) => {
          const date = moment(workout.date).format('DD-MM-YYYY')
          return (
            <div onClick={() => this.props.toggleShowingWorkout(workout)}>
              {workout.isShowing ? (
                <PreviousWorkoutContainer>
                  <table>
                    <tr>
                      <TableHeading>Exercise name</TableHeading>
                      <TableHeading>Sets</TableHeading>
                      <TableHeading>Reps</TableHeading>
                      <TableHeading>Weight</TableHeading>
                    </tr>
                    {workout.workoutExercises.workouts.map(exercise => (
                      <tr>
                        <TableData>{exercise.name}</TableData>
                        <TableData>{exercise.sets}</TableData>
                        <TableData>{exercise.reps}</TableData>
                        <TableData>{exercise.weight}kg</TableData>
                      </tr>
                    ))}
                  </table>
                </PreviousWorkoutContainer>
              ) : (
                <PreviousWorkoutContainer>
                  <WorkoutDate> {date} Click to view workout </WorkoutDate>
                </PreviousWorkoutContainer>
              )}
            </div>
          )
        })}
      </Container>
    )
  }
}

const mapStateToProps = ({ workouts }) => ({
  workouts,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchPreviousWorkouts, toggleShowingWorkout }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)
