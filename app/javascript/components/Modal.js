import React, {Component} from 'react'

class Modal extends Component {

  handleRedirect = (event) => {
    event.preventDefault()
    this.props.handleView(event.target.id)
  }

  render(){
    return (
      <div className="my-modal">
        <div className="my-modal-textbox">
          <h3>Hold up!</h3>
          <p>You need to log in to do that.</p>
          <button
            className="btn btn-light"
            id="login"
            onClick={this.handleRedirect}>
              Log In
          </button>
          <button
            className="btn btn-dark"
            id="signup"
            onClick={this.handleRedirect}>
              Sign Up
          </button>
        </div>
      </div>
    )
  }
}

export default Modal
