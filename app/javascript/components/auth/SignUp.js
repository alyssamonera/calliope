import React, {Component} from 'react'
import { Auth } from 'aws-amplify'

class SignUp extends Component {
  constructor(){
    super()
    this.state = {
      username: "",
      email: "",
      password: "",
      avatar: "",
      error: null
    }
  }

  defaultAvatar = () => {
    if (this.state.avatar === ""){
      this.setState({
        avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/500px-User_font_awesome.svg.png"
      })
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSubmit = async event => {
    event.preventDefault()
    if (this.validate()){
      this.defaultAvatar()
      const { username, email, password } = this.state
      try {
        const signUpResponse = await Auth.signUp({
          username,
          password,
          attributes: {
            email: email
          }
        })
        this.props.addUser(this.state)
      } catch (error) {
        if (error.code === "UsernameExistsException"){
          this.setState({
            error: "Sorry, that username already exists."
          })
        } else {
          this.setState({
            error: "Something went wrong. Please make sure all required fields are filled out."
          })
        }
      }
    } else {
      this.setState({
        error: "Something went wrong. Please make sure all required fields are filled out."
      })
    }
  }

  validate = async () => {
    if (this.state.username && this.state.email && this.state.password){
      const error = await this.setState({
        error: null
      })
      return true
    } else {
      return false
    }
  }

  render(){
    return (
      <div className="auth-page">

        {this.state.error
          ? <div className="error-message">
              <p>{this.state.error}</p>
            </div>
          : ""}

        <h2> Sign Up </h2>
        <form onSubmit={this.handleSubmit}>

          <label htmlFor="username">Username</label>
          <input type="text" id="username" value={this.state.username} placeholder="Username" onChange={this.handleChange} />

          <label htmlFor="email">Email</label>
          <input type="text" id="email" value={this.state.email} placeholder="name@somesite.com" onChange={this.handleChange} />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={this.state.password} placeholder="Password" onChange={this.handleChange} />

          <label htmlFor="avatar">Avatar (optional)</label>
          <input type="text" id="avatar" value={this.state.avatar} placeholder="example.jpg" onChange={this.handleChange} />

          <input type="submit" value="Sign Up" className="btn btn-dark" />

        </form>
      </div>
    )
  }
}

export default SignUp
