import React from 'react'
import axios from 'axios'

class Person extends React.Component {

  state = {
    name: 'Rich',
    age: 26,
    city: 'London'
  }

  render(){
    return (
      <div> name: {this.state.name} </div>
    )
  }
}
