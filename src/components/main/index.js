import React, { Component } from 'react'

import PreviousWorkouts from 'components/previousWorkouts'
import Search from 'components/search'
import Workout from 'components/workout'
import axios from 'axios'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Section = styled.div`
  width: 100%;
`

class Main extends Component {
  state = {
    exercises: [],
  }

  componentDidMount() {
    axios.get('http://localhost:3007/exercises').then(data => {
      data.data.map(exercise => {
        this.setState({
          exercises: this.state.exercises.concat({
            value: exercise.name,
            label: exercise.name,
          }),
        })
      })
    })
  }

  render() {
    return (
      <Container>
        <Section>
          <Workout exercises={this.state.exercises} />
        </Section>
        <Search exercises={this.state.exercises} />
        <Section>
          <PreviousWorkouts />
        </Section>
      </Container>
    )
  }
}

export default Main
