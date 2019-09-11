import React, {Component} from 'react'

class Show extends Component {
  render(){
    return (
      <div className="prompt-show">
        <h1> {this.props.prompt.title} </h1>
        <h3> {this.props.prompt.body ? this.props.prompt.body : ""} </h3>

        <div className="prompt-options">
          <button onClick={() => {this.props.handleView('editPage', this.props.prompt)}} className="btn btn-light">
            Edit
          </button>

          <button onClick={() => {this.props.deletePrompt(this.props.prompt.id)}} className="btn btn-light">
            Delete
          </button>

        </div>

      </div>
    )
  }
}

export default Show
