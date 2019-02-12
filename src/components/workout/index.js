import React from 'react'
import { Formik, Field, Form, FieldArray } from 'formik';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Select from 'react-select'
import styled from 'styled-components'
import axios from 'axios'

import { Button } from 'components/shared/button'
import { submitWorkout } from 'redux/action-creators/workouts'

const Container = styled.div`
  box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 4px 0px;
  background: #e7e7e7;
  padding: 3px;
  margin-bottom: 10px;
`

const StyledButton = styled(Button)`
  width: 10%;
  height: 34px;
  padding: 0;
`

const StyledField = styled(Field)`
  width: 34px;
  height: 34px;
  font-size: 10px;
  text-align: center;
  padding: 0;
`

export const StyledSelect = styled(Select)`
  width: 100%;
  margin-bottom: 5px;
`

export const StyledSelect2 = styled(Select)`
  width: 150px;
  font-size: 10px;
`

const InputContainer = styled.span`
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const OuterContainer = styled.div`
  display: flex;
  flex-direction: row;
`

class Workout extends React.Component {
  render(){
    const date = Date.now()
    return (
      <Container>
        <h4> New Workout </h4>
        <Formik
          initialValues={{ workouts: [{ name: '', reps: '', sets: '', weight: '' }]}}
          onSubmit={
            (values, {resetForm}) => (
              this.props.submitWorkout(values, date),
              resetForm()
            )
          }
          render={({ values, setFieldValue }) => (
            <Form>
              <FieldArray
                name="workouts"
                render={arrayHelpers => (
                  <div>
                    <StyledButton
                      text="add exercise"
                      type="button"
                      onClick={() => arrayHelpers.push({ name: '', reps: 0, sets: 0, weight: 0 })}
                    />
                    {values.workouts.map((workout, index) => (
                      <div key={index}>
                        <InputContainer>
                          <StyledSelect2 name={`workouts[${index}].options`}
                            options={this.props.exercises}
                            onChange={(value) => setFieldValue(`workouts[${index}].name`, value.value)}
                          />
                          <StyledField placeholder="reps" name={`workouts[${index}].reps`} />
                          <StyledField placeholder="sets" name={`workouts[${index}].sets`} />
                          <StyledField placeholder="weight" name={`workouts[${index}].weight`} />
                          <StyledButton type="button" text="-" onClick={() => arrayHelpers.remove(index)} />
                        </InputContainer>
                      </div>
                    ))}

                    <Button
                      type="submit"
                      text="Submit Workout"
                    />
                  </div>
                )}
              />
            </Form>
          )}
        />
      </Container>
    )
  }
}

const mapStateToProps = ({ workouts, languages }) => ({
  workouts,
  languages
})

const mapDispatchToProps = dispatch => bindActionCreators({ submitWorkout }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Workout)
