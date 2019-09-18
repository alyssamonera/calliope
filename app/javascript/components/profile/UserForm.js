import React, {Component} from 'react'
import {Auth} from 'aws-amplify'

class UserForm extends Component {
  constructor(){
    super()
    this.state = {
      username: "",
      avatar: "",
      oldPassword: "",
      newPassword: ""
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    if (this.state.newPassword.length > 0){
      const user = await Auth.currentAuthenticatedUser()
      try {
        await Auth.changePassword(
          user,
          this.state.oldPassword,
          this.state.newPassword
        )
      } catch (error) {
        console.log(error)
      }
    }
    this.props.updateUser(this.state)
    alert("Profile has been updated. Redirecting...")
    this.props.history.push(`/user/${this.state.username}`)
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

        <label htmlFor="oldPassword">Old password</label>
        <input type="password" value={this.state.oldPassword} onChange={this.handleChange} id="oldPassword" />

        <label htmlFor="newPassword">New password</label>
        <input type="password" value={this.state.newPassword} onChange={this.handleChange} id="newPassword" />

        <input type="submit" value="Update" className="btn btn-dark" />

      </form>
    )
  }
}

export default UserForm
