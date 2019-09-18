import React, {Component} from 'react'
import {Auth} from 'aws-amplify'

class Recovery extends Component {
  constructor(){
    super()
    this.state = {
      email: "",
      error: false
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await Auth.forgotPassword(this.state.email)
      this.setState({
        error: false
      })
      this.props.history.push("/passverification")
    } catch (error) {
      this.setState({
        error: true
      })
    }
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit} className="auth-page">

        {this.state.error
          ? <div className="error-message">
              Something went wrong. Check the required fields and try again.
            </div>
          : ""}

        <h2>Forgot password</h2>
        <p>Please enter the email address you signed up with. We'll send you a verification code shortly.</p>

        <label htmlFor="email">Your email</label>
        <input type="text" value={this.state.email} placeholder="youraddress@email.com" onChange={this.handleChange} id="email" />

        <input type="submit" value="Send" className="btn btn-light" />

      </form>
    )
  }
}

export default Recovery
