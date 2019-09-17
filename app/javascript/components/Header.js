import React, {Component} from 'react'
import { Auth } from 'aws-amplify'

class Header extends Component {
  constructor(){
    super()
  }

  handleLogOut = async event => {
    event.preventDefault()
    try {
      const signout = await Auth.signOut()
      this.props.setAuth(false, null)
    } catch (error) {
      console.log(error);
    }
  }

  render(){
    return (
      <header>
        <div className="title-bar">
          <h1>
            <a href="/">
              Calliope
            </a>
          </h1>

          <div className="title-links">
            {this.props.currentUser.isAuthenticated && this.props.currentUser.user
              ? <button
                  className="btn btn-dark"
                  onClick={this.handleLogOut}>
                    Log Out ({this.props.currentUser.user.username})
                </button>
              : <div>
                  <button className="btn btn-dark">
                    <a href="/login">
                      Log In
                    </a>
                  </button>
                  <button className="btn btn-dark">
                      Sign Up
                  </button>
                </div>
            }

          </div>

        </div>

        <nav>
          <ul>
            <li>
              About
            </li>
            <li>
              <a href="/browse">
                Browse
              </a>
            </li>
            <li>
              <a href="/new/prompt">
                Create
              </a>
            </li>
          </ul>
        </nav>
      </header>
    )
  }

}

export default Header
