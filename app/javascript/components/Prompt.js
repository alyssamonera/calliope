import React, {Component} from 'react'

class Prompt extends Component {
  render(){
    return (
      <div>
        <h1 onClick={() => {this.props.handleView('show', this.props.prompt)}}>{this.props.prompt.title}</h1>
      </div>
    )
  }
}

export default Prompt
