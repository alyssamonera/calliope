import React from 'react'
import Main from './Main.js'
import Header from './Header.js'

class App extends React.Component{
  constructor(){
    super()
    this.state = {
      view: 'index',
      formInputs: {
        title: '',
        body: '',
        user_id: null,
        id: null
      },
      currentPrompt: {
        title: null,
        body: null,
        user: null,
        replies: null,
        id: null
      },
      currentUser: {
        isAuthenticated: false,
        user: null,
        id: null
      },
      currentReply: {
        title: null,
        body: null,
        user: null,
        prompt: null,
        id: null
      }
    }
  }

  // ===============
  // AUTHENTICATION
  // ===============
  setAuth = (authenticated, user) => {
    if (authenticated){
      fetch(`/login/${user.username}`)
        .then(data => data.json())
        .then(jData => {
          this.setState({
            currentUser: {
              user: user,
              isAuthenticated: authenticated,
              id: parseInt(jData.id)
            }
          })
        })
    } else {
      this.setState({
        currentUser: {
          user: user,
          isAuthenticated: authenticated,
          id: null
        }
      })
    }
  }

  render(){
    return (
      <div>
        <Header
          currentUser={this.state.currentUser}
          setAuth={this.setAuth} />
        <Main
          view={this.state.view}
          currentPrompt={this.state.currentPrompt}
          formInputs={this.state.formInputs}
          currentUser={this.state.currentUser}
          setAuth={this.setAuth}
          fetchReplies={this.fetchReplies} />
      </div>
    )
  }
}

export default App
