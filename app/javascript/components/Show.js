import React, {Component} from 'react'

class Show extends Component {
  render(){
    return (
      <div className="prompt-show">
        <h1> {this.props.prompt.title} </h1>
        <h3> {this.props.prompt.body ? this.props.prompt.body : ""} </h3>
      </div>
    )
  }
}

export default Show
