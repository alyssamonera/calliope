import React, {Component} from 'react'
import ReplyIndex from './ReplyIndex.js'

class ShowPrompt extends Component {
  constructor(){
    super()
    this.state = {
      prompt: {
        title: null,
        body: null,
        replies: [],
        user: {
          id: null,
          username: null
        },
        id: null
      }
    }
  }

  componentDidMount(){
    fetch(`/api/prompts/${this.props.match.params.id}`)
      .then(postData => postData.json())
      .then(jsonedPost => {
        this.setState({
          prompt: {
            title: jsonedPost.title,
            body: jsonedPost.body,
            user: jsonedPost.user,
            replies: jsonedPost.replies,
            id: parseInt(jsonedPost.id)
          }
        })
      })
  }

  prepareEdit = (event) => {
    event.preventDefault()

    let jsonedPrompt = JSON.stringify(this.props.prompt)
    localStorage.setItem("currentPost", jsonedPrompt)
    window.location.href = '/edit/prompt'

  }

  render(){
    return (
      <div className="prompt-show">
        <button className="btn btn-dark">
          <a href="/">
            Back
          </a>
        </button>
        <h1> {this.state.prompt.title} </h1>
        {this.state.prompt.body ? <p> {this.state.prompt.body} </p> : ""}

        <p className="blockquote-footer text-muted byline">
          {this.state.prompt.user.username}
        </p>


        <div className="prompt-options">
          {this.props.currentUser.user
            ? this.props.currentUser.user.username === this.state.prompt.user.username
              ?
                <div>
                  <button className="btn btn-light" onClick={this.prepareEdit}>
                      Edit
                  </button>

                  <button
                    className="btn btn-light"
                    onClick={()=>{this.props.deletePrompt(this.state.prompt.id)}}>
                    Delete
                  </button>
                </div>
              : ""
            : ""}
        </div>

        <ReplyIndex prompt={this.state.prompt} currentUser={this.props.currentUser} />

      </div>
    )
  }
}

export default ShowPrompt
