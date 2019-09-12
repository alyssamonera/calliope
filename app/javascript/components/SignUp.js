import React, {Component} from 'react'
import { Auth } from 'aws-amplify'

class SignUp extends Component {
  constructor(){
    super()
    this.state = {
      username: "",
      email: "",
      password: ""
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
        console.log(error)
        if (error.code === "UsernameExistsException"){
          alert("Sorry, that userame already exists.")
        }
      }

    } else {
      console.log("failed");
    }
  }

  validate = () => {
    if (this.state.username && this.state.email && this.state.password){
      return true
    } else {
      return false
    }
  }

  render(){
    return (
      <div className="login-page">
        <h2> Sign Up </h2>
        <form onSubmit={this.handleSubmit}>

          <label htmlFor="username">Username</label>
          <input type="text" id="username" value={this.state.username} placeholder="Username" onChange={this.handleChange} />

          <label htmlFor="email">Email</label>
          <input type="text" id="email" value={this.state.email} placeholder="name@somesite.com" onChange={this.handleChange} />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={this.state.password} placeholder="Password" onChange={this.handleChange} />

          <input type="submit" value="Sign Up" />

        </form>
      </div>
    )
  }
}

export default SignUp
