import React, {Component} from 'react'

class Verify extends Component {
  constructor(){
    super()
    this.state = {
      email: "",
      code: "",
      password: ""
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    console.log(this.state);
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit} className="auth-page">
        <h2>Enter your verification code, email, and a new password</h2>

        <label htmlFor="code">Your code</label>
        <input type="text" value={this.state.code} placeholder="Enter code" id="code" onChange={this.handleChange} />

        <label htmlFor="email">Your email</label>
        <input type="text" value={this.state.email} placeholder="youraddress@email.com" id="email" onChange={this.handleChange} />

        <label htmlFor="password">New password</label>
        <input type="password" value={this.state.password} placeholder="New password" id="password" onChange={this.handleChange} />

        <input type="submit" value="Log in" className="btn btn-dark" />

      </form>
    )
  }
}

export default Verify
