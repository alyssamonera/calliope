import React, {Component} from 'react'

class Modal extends Component {

  render(){
    return (
      <div className="my-modal">
        <div className="my-modal-textbox">
          <h3>Hold up!</h3>
          <p>You need to log in to do that.</p>
          <button className="btn btn-light">
            <a href="/login">
              Log In
            </a>
          </button>
          <button className="btn btn-dark">
              Sign Up
          </button>
        </div>
      </div>
    )
  }
}

export default Modal
