import React, {Component} from 'react'

class User extends Component {
  constructor(){
    super()
    this.state = {
      username: null,
      avatar: null
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
          avatar: jsonedData.avatar
        })
      })
  }

  render(){
    return (
      <main className="user-show">
        <img src={this.state.avatar} alt="avatar" className="img-thumbnail" />

        <h2>{this.state.username}</h2>

      </main>
    )
  }
}

export default User
