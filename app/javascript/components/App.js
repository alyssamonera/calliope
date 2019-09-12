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
        user_id: null,
        id: null
      },
      currentUser: {
        isAuthenticated: false,
        user: null
      }
    }
  }

  handleView = (view, prompt) => {
    let formInputs = {
      title: '',
      body: '',
      user_id: 1,
      id: null
    }
    let currentPrompt = {
      title: '',
      body: '',
      user_id: null,
      id: null
    }
    let currentUser = this.state.currentUser
    switch (view){
      case 'show':
        currentPrompt = {
          title: prompt.title,
          body: prompt.body,
          user_id: prompt.user_id,
          id: prompt.id
        }
        break;
      case 'editPage':
        formInputs = {
          title: prompt.title,
          body: prompt.body,
          user_id: prompt.user_id,
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
    console.log(this.state);
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
