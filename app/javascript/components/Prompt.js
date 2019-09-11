import React, {Component} from 'react'

class Prompt extends Component {
  render(){
    return (
      <div>
        <h1>{this.props.prompt.title}</h1>
      </div>
    )
  }
}

export default Prompt
