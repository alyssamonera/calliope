import React, {Component} from 'react'
import { Auth } from 'aws-amplify'

class LogIn extends Component{
  constructor(){
    super()
    this.state = {
      username: "",
      password: ""
    }
  }

  handleSubmit = async event => {
    event.preventDefault()

    try {
      const user = await Auth.signIn(this.state.username, this.state.password)
      this.props.setAuth(true, user)
      this.props.history.push("/")
    } catch (error) {
      console.log(error)
    }

  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  render(){
    return (
      <div className="login-page">
        <h2> Log In </h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username</label>
          <input type="text" value={this.state.username} placeholder="Username" id="username" onChange={this.handleChange} />

          <label htmlFor="password">Password</label>
          <input type="password" value={this.state.password} placeholder="Password" id="password" onChange={this.handleChange} />

          <input type="submit" value="Log In" className="btn btn-light" />

        </form>
      </div>
    )
  }
}

export default LogIn
