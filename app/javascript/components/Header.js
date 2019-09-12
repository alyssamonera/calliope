import React, {Component} from 'react'

class Header extends Component {
  constructor(){
    super()
  }

  render(){
    return (
      <header>
        <div className="title-bar">
          <h1 onClick={() => {this.props.handleView('index')}}>
            Calliope
          </h1>

          <div className="title-links">
            {this.props.currentUser.isAuthenticated && this.props.currentUser.user
              ? <button className="btn btn-dark">
                  Log Out ({this.props.currentUser.user.username})
                </button>
              : <div>
                  <button
                    className="btn btn-dark"
                    onClick={() => {this.props.handleView('login'); console.log(this.props)}}>
                    Log In
                  </button>
                  <button
                    className="btn btn-dark"
                    onClick={() => {this.props.handleView('signup')}}>
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
            <li onClick={() => {this.props.handleView('index')}}>
              Browse
            </li>
            <li onClick={() => {this.props.handleView('addPage')}}>
              Create
            </li>
          </ul>
        </nav>
      </header>
    )
  }

}

export default Header
