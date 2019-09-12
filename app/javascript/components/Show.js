import React, {Component} from 'react'

class Show extends Component {
  render(){
    return (
      <div className="prompt-show">
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
                  <button onClick={() => {this.props.handleView('editPage', this.props.prompt)}} className="btn btn-light">
                    Edit
                  </button>

                  <button onClick={() => {this.props.deletePrompt(this.props.prompt.id)}} className="btn btn-light">
                    Delete
                  </button>
                </div>
              : ""
            : ""}

        </div>

      </div>
    )
  }
}

export default Show
