import React, {Component} from 'react'

class UserForm extends Component {
  constructor(){
    super()
    this.state = {
      username: "",
      avatar: ""
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.updateUser(this.state)
  }

  componentDidMount(){
    let user = localStorage.getItem("currentUser")
    let parsedUser = JSON.parse(user)
    this.setState({
      username: parsedUser.username,
      avatar: parsedUser.avatar
    })
  }

  render(){
    return (
      <form className="auth-page" onSubmit={this.handleSubmit}>

        <img src={this.state.avatar} alt="avatar" className="img-thumbnail" />

        <label htmlFor="avatar">Avatar</label>
        <input type="text" value={this.state.avatar} onChange={this.handleChange} id="avatar" />

        <input type="submit" value="Update" className="btn btn-dark" />

      </form>
    )
  }
}

export default UserForm
