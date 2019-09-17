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

  componentDidMount(){
    let username = window.location.href.split("/user/")[1]
    fetch(`/api/users/${username}`)
      .then(data => data.json())
      .then(jsonedData => {
        console.log(jsonedData);
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
