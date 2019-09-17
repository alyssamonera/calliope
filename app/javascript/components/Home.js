import React, {Component} from 'react'

class Home extends Component {
  render(){
    return (
      <main className="home-page">
        <h2>
        Welcome
        {this.props.currentUser.id ? `, ${this.props.currentUser.user.username}`: ""}
        !
        </h2>
      </main>
    )
  }
}

export default Home
