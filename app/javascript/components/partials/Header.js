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
              ? <div>
                  <button
                    className="btn btn-dark"
                    onClick={this.handleLogOut}>
                      Log Out ({this.props.currentUser.user.username})
                  </button>

                  <a href={"/user/" + this.props.currentUser.user.username}>
                    <button className="btn btn-dark">
                      Account
                    </button>
                  </a>
                </div>
              : <div>
                  <a href="/login">
                    <button className="btn btn-dark">
                      Log In
                    </button>
                  </a>

                  <a href="/signup">
                    <button className="btn btn-dark">
                        Sign Up
                    </button>
                  </a>
                </div>
            }

          </div>

        </div>

        <nav>
          <ul>
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
