import React, {Component} from 'react'
import Reply from './Reply.js'

class ShowPrompt extends Component {

  prepareEdit = (event) => {
    event.preventDefault()

    let jsonedPrompt = JSON.stringify(this.props.prompt)
    localStorage.setItem("currentPost", jsonedPrompt)
    window.location.href = '/edit/prompt'

  }

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
                  <button className="btn btn-light" onClick={this.prepareEdit}>
                      Edit
                  </button>

                  <button
                    className="btn btn-light"
                    onClick={()=>{this.props.deletePrompt(this.props.prompt.id)}}>
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
