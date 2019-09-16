import React, {Component} from 'react'

class Prompt extends Component {
  render(){
    return (
      <div>
        <blockquote
          className="blockquote one-prompt"
          onClick={() => {this.props.handleView('showPrompt', this.props.prompt)}} >

          {/* TITLE */}
          <p className="mb-0">
            {this.props.prompt.title}
          </p>

          {/* AUTHOR */}
          <p className="blockquote-footer text-muted byline">
            {this.props.prompt.user.username}
          </p>

        </blockquote>
      </div>
    )
  }
}

export default Prompt
