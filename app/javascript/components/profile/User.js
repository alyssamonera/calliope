import React, {Component} from 'react'

class User extends Component {
  constructor(){
    super()
    this.state = {
      username: null,
      avatar: null,
      replies: [],
      prompts: []
    }
  }

  prepareEdit = () => {
    let jsonedUser = JSON.stringify(this.state)
    localStorage.setItem("currentUser", jsonedUser)
    window.location.href = "/edit/user"
  }

  componentDidMount(){
    let username = window.location.href.split("/user/")[1]
    fetch(`/api/users/${username}`)
      .then(data => data.json())
      .then(jsonedData => {
        this.setState({
          username: jsonedData.username,
          avatar: jsonedData.avatar,
          replies: jsonedData.replies,
          prompts: jsonedData.prompts
        })
      })
  }

  render(){
    return (
      <main className="user-show">
        <img src={this.state.avatar} alt="avatar" className="img-thumbnail" />

        <h2>{this.state.username}</h2>

        {this.props.currentUser.user
          ? this.props.currentUser.user.username === this.state.username
            ? <div className="profile-actions">
                <button className="btn btn-dark" onClick={this.prepareEdit}>
                  Update your account
                </button>
                <button className="btn btn-danger">
                  Delete your account
                </button>
              </div>
            : ""
          : ""}

        <h5>Prompts written by {this.state.username}</h5>
        <ul>
          {this.state.prompts.map(prompt =>
            <li key={prompt.id}>
              <a href={"/prompts/" + prompt.id}>
                {prompt.title}
              </a>
            </li>)}
        </ul>

        <h5>Stories written by {this.state.username}</h5>
        <ul>
          {this.state.replies.map(reply =>
            <li key={reply.id}>
              <a href={"/replies/" + reply.id}>
                {reply.title}
              </a>
            </li>)}
        </ul>

      </main>
    )
  }
}

export default User
