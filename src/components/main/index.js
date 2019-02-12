import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'

import Workout from 'components/workout'
import Search from 'components/search'
import PreviousWorkouts from 'components/previousWorkouts'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const TopSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`

const Section = styled.div`
  width: 100%;
`

class Main extends Component {

  state = {
    exercises: []
  }

  componentDidMount() {
    axios.get('http://localhost:3007/exercises').then((data) => {
      data.data.map(exercise => {
        this.setState({exercises: this.state.exercises.concat({value: exercise.name, label: exercise.name})})
      })
    })
  }

  render() {
    return (
      <Container>
          <Section>
            <Workout
              exercises={this.state.exercises}
            />
          </Section>
          <Search
            exercises={this.state.exercises}
          />
        <Section>
          <PreviousWorkouts />
        </Section>
      </Container>
    );
  }
}

export default Main
