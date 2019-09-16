import React from 'react'
import Main from './Main.js'
import Header from './Header.js'

class App extends React.Component{
  constructor(){
    super()
    this.state = {
      view: 'index',
      formInputs: {
        title: null,
        body: null,
        user_id: null,
        id: null
      },
      currentPrompt: {
        title: null,
        body: null,
        user: null,
        id: null
      },
      currentUser: {
        isAuthenticated: false,
        user: null,
        id: null
      },
      currentReplies: []
    }
  }

  // ===============
  //  HANDLE VIEW
  // ===============
  handleView = (view, prompt) => {
    let formInputs = {
      title: '',
      body: '',
      user_id: this.state.currentUser.id,
      id: null
    }
    let currentPrompt = {
      title: '',
      body: '',
      user: null,
      id: null
    }
    switch (view){
      case 'show':
        currentPrompt = {
          title: prompt.title,
          body: prompt.body,
          user: prompt.user,
          id: prompt.id
        }
        break;
      case 'editPage':
        formInputs = {
          title: prompt.title,
          body: prompt.body,
          user_id: prompt.user.id,
          id: prompt.id
        }
      default:
        break;
    }
    this.setState({
      view: view,
      formInputs: formInputs,
      currentPrompt: currentPrompt
    })
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
          this.handleView('index')
        })
    } else {
      this.setState({
        currentUser: {
          user: user,
          isAuthenticated: authenticated,
          id: null
        }
      })
      this.handleView('index')
    }
  }

  render(){
    return (
      <div>
        <Header
          handleView={this.handleView}
          currentUser={this.state.currentUser}
          setAuth={this.setAuth} />
        <Main
          view={this.state.view}
          currentPrompt={this.state.currentPrompt} handleView={this.handleView}
          formInputs={this.state.formInputs}
          currentUser={this.state.currentUser}
          setAuth={this.setAuth}
          fetchReplies={this.fetchReplies} />
      </div>
    )
  }
}

export default App
