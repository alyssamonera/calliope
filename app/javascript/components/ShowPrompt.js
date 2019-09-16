import React, {Component} from 'react'
import Reply from './Reply.js'

class ShowPrompt extends Component {
  render(){
    return (
      <div className="prompt-show">
        <button
          className="btn btn-dark"
          onClick={this.props.backToIndex}>
          Back
        </button>
        <h1> {this.props.prompt.title} </h1>
        {this.props.prompt.body ? <p> {this.props.prompt.body} </p> : ""}

        <p className="blockquote-footer text-muted byline">
          {this.props.prompt.user.username}
        </p>


        <div className="prompt-options">
          {this.props.currentUser.user
            ? this.props.currentUser.user.username === this.props.prompt.user.username
              ?
                <div>
                  <button className="btn btn-light">
                    Edit
                  </button>

                  <button className="btn btn-light">
                    Delete
                  </button>
                </div>
              : ""
            : ""}
        </div>

        <div className="prompt-responses">
          {this.props.prompt.replies.map(reply =>
            <Reply
              key={reply.id}
              reply={reply}
              prompt={this.props.prompt} />)}
        </div>

      </div>
    )
  }
}

export default ShowPrompt
