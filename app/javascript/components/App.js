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
        user: null,
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
        user: null
      }
    }
  }

  handleView = (view, prompt) => {
    let user = {username: null}
    if (this.state.currentUser.user){
      user = {username: this.state.currentUser.user.username}
    }
    let formInputs = {
      title: '',
      body: '',
      user: user,
      id: null
    }
    let currentPrompt = {
      title: '',
      body: '',
      user: null,
      id: null
    }
    let currentUser = this.state.currentUser
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
          user: prompt.user,
          id: prompt.id
        }
      default:
        break;
    }
    this.setState({
      view: view,
      formInputs: formInputs,
      currentPrompt: currentPrompt,
      currentUser: currentUser
    })
  }

  setAuth = (authenticated, user) => {
    this.setState({
      currentUser: {
        user: user,
        isAuthenticated: authenticated
      }
    })
    this.handleView('index')
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
          setAuth={this.setAuth} />
      </div>
    )
  }
}

export default App
