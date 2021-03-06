import React, {Component} from 'react'

class Prompt extends Component {
  render(){
    return (
      <div>
        <blockquote className="blockquote one-prompt">

          {/* TITLE */}
          <a className="mb-0" href={"/prompts/" + this.props.prompt.id}>
            {this.props.prompt.title}
          </a>

          {/* AUTHOR */}
          <a href={"/user/" + this.props.prompt.user.username}>
            <p className="blockquote-footer text-muted byline">
              {this.props.prompt.user.username}
            </p>
          </a>

        </blockquote>
      </div>
    )
  }
}

export default Prompt
