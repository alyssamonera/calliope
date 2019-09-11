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
