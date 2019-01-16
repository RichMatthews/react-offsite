import React from 'react'
import axios from 'axios'

class Api extends React.Component {

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos/1').then((data) => {
      console.log(data)
    })
  }

  render(){
    return (
      <div> I am the API component </div>
    )
  }
}
