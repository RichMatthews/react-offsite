import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components'

import Graph from 'components/graph'
import { searchForExercise } from 'redux/action-creators/exercises'
import { StyledSelect } from 'components/workout'
import { Button } from 'components/shared/button'

const Container = styled.div`
  box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 4px 0px;
  background: #e7e7e7;
  padding: 3px;
  margin-bottom: 10px;
`

const SearchContainer = styled.div`
  width: 100%;
`

const SearchInput = styled.input`
  font-size: 14px;
  border: none;
  width: 90%;
  padding: 5px;
`

class Search extends React.Component {

  state = {
    searchTerm: ''
  }

  handleChange(value){
    this.setState({searchTerm: value})
  }

  render(){
    let renderSearchResult
    if (this.props.exerciseData.current){
      renderSearchResult = (
        <div>
          <div> Exercise {this.props.exerciseData.current.name} </div>
          <div> Last weight lifted {this.props.exerciseData.current.lastWeightLifted} kg </div>
        </div>
      )
    } else {
      renderSearchResult = (
        <div> We couldn't find that exercise </div>
      )
    }

    return(
      <Container>
        <h4> Search for an exercise </h4>
        <SearchContainer>
          <StyledSelect
            options={this.props.exercises}
            placeholder="search for an exercise"
            onChange={(value) => this.handleChange(value)}
          />
        </SearchContainer>
        <Button text="search..." onClick={() => this.props.searchForExercise(this.state.searchTerm)} />
        {this.props.exerciseData.searched ? <div> {renderSearchResult} </div> : null }
        <Graph
          currentExercise={this.props.exerciseData.current}
        />
      </Container>
    )
  }
}

const mapStateToProps = ({ exerciseData }) => ({
  exerciseData
})

const mapDispatchToProps = dispatch => bindActionCreators({ searchForExercise }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Search)
