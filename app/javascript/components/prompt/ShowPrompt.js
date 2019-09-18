import React, {Component} from 'react'
import ReplyIndex from '../reply/ReplyIndex.js'

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

  prepareEdit = (event) => {
    event.preventDefault()
    let jsonedPrompt = JSON.stringify(this.state.prompt)
    localStorage.setItem("currentPrompt", jsonedPrompt)
    window.location.href = event.target.id
  }

  handleDelete = () => {
    this.props.deletePrompt(this.state.prompt.id)
    this.props.history.push("/browse")
  }

  componentDidMount(){
    let id = window.location.href.split("/prompts/")[1]
    fetch(`/api/prompts/${id}`)
      .then(postData => postData.json())
      .then(jsonedPost => {
        this.setState({
          prompt: {
            title: jsonedPost.title,
            body: jsonedPost.body,
            user: jsonedPost.user,
            replies: jsonedPost.replies,
            id: parseInt(jsonedPost.id),
            prompt_id: parseInt(jsonedPost.id)
          }
        })
      })
  }

  render(){
    return (
      <div className="prompt-show">

        <a href="/browse">
          <button className="btn btn-dark">
            Back
          </button>
        </a>


        <h1> {this.state.prompt.title} </h1>
        {this.state.prompt.body ? <p> {this.state.prompt.body} </p> : ""}

        <a href={"/user/" + this.state.prompt.user.username}>
          <p className="blockquote-footer text-muted byline">
            {this.state.prompt.user.username}
          </p>
        </a>


        <div className="prompt-options">
          {this.props.currentUser.user
            ? this.props.currentUser.user.username === this.state.prompt.user.username
              ?
                <div>
                  <button
                    id="/edit/prompt"
                    className="btn btn-light"
                    onClick={this.prepareEdit}>
                      Edit
                  </button>

                  <button
                    className="btn btn-light"
                    onClick={this.handleDelete}>
                    Delete
                  </button>
                </div>
              : <button
                  id="/new/reply"
                  className="btn btn-light"
                  onClick={this.prepareEdit}>
                  Write a response
                </button>
            : ""
            }
        </div>

        <ReplyIndex prompt={this.state.prompt} currentUser={this.props.currentUser} />

      </div>
    )
  }
}

export default ShowPrompt
