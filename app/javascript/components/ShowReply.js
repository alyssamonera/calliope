import React, {Component} from 'react'

class ShowReply extends Component {
  constructor(){
    super()
    this.state = {
      reply: {
        title: null,
        body: null,
        id: null,
        prompt: {
          title: null,
          body: null,
          id: null
        },
        user: {
          username: null,
          id: null
        }
      },
      currentUser: {
        username: null,
        id: null
      }
    }
  }

  prepareEdit = () => {
    let jsonedReply = JSON.stringify(this.state.reply)
    localStorage.setItem("currentReply", jsonedReply)
    let jsonedPrompt = JSON.stringify(this.state.reply.prompt)
    localStorage.setItem("currentPrompt", jsonedPrompt)
    window.location.href = "/edit/reply"
  }


  componentDidMount(){
    fetch(`/api/replies/${this.props.match.params.id}`)
      .then(data => data.json())
      .then(jsonedData => {
        this.setState({
          reply: {
            title: jsonedData.title,
            body: jsonedData.body,
            id: parseInt(jsonedData.id),
            prompt: jsonedData.prompt,
            user: jsonedData.user
          },
          currentUser: {
            username: this.props.currentUser.user.username,
            id: this.props.currentUser.id
          }
        })
      })
  }

  render(){
    return (
      <div>

        <a href={"/prompts/" + this.state.reply.prompt.id}>
          <button className="btn btn-dark">
            Back to the prompt
          </button>
        </a>

        <h4>Original Prompt:</h4>
        <blockquote cite={"/prompts/" + this.state.reply.prompt.id} className="quote">
          {this.state.reply.prompt.title}
          {this.state.reply.prompt.body ? this.state.reply.prompt.body : ""}
        </blockquote>

        <div className="reply">
          <h4>{this.state.reply.title}</h4>
          <a href="#" className="text-muted byline">
            by {this.state.reply.user.username}
          </a>

          <p>
            {this.state.reply.body}
          </p>
        </div>


          {this.state.currentUser.id
            ? this.state.currentUser.username === this.state.reply.user.username
              ? <div className="reply-options">
                  <button className="btn btn-light"
                    onClick={this.prepareEdit}>
                      Edit
                  </button>
                  <button
                    className="btn btn-light"
                    onClick={()=> {this.props.deleteReply(this.state.reply)}}>
                    Delete
                  </button>
                </div>
              : ""
            : ""}

      </div>
    )
  }
}

export default ShowReply
