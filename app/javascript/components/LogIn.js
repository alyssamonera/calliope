import React, {Component} from 'react'

class LogIn extends Component{
  constructor(){
    super()
    this.state = {
      username: "",
      password: ""
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    console.log(this.state);
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

          <input type="submit" value="Log In" />

        </form>
      </div>
    )
  }
}

export default LogIn
