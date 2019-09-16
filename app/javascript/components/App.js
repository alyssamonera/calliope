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
  //  HANDLE VIEW
  // ===============
  handleView = (view, body) => {
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
      replies: null,
      id: null
    }
    let currentReply = {
      title: '',
      body: '',
      user: null,
      prompt: null,
      id: null
    }
    switch (view){
      case 'showPrompt':
        currentPrompt = {
          title: body.title,
          body: body.body,
          user: body.user,
          replies: body.replies,
          id: body.id
        }
        break;
      case 'editPrompt':
        formInputs = {
          title: body.title,
          body: body.body,
          user_id: body.user.id,
          replies: body.replies,
          id: body.id
        }
        break;
      case 'showReply':
        currentReply = {
          title: body.title,
          body: body.body,
          user: body.user,
          prompt: body.prompt,
          id: body.id
        }
        break;
      case 'editReply':
        formInputs = {
          title: body.title,
          body: body.body,
          user_id: body.user.id,
          prompt: body.prompt,
          id: body.id
        }
        break;
      default:
        break;
    }
    this.setState({
      view: view,
      formInputs: formInputs,
      currentPrompt: currentPrompt,
      currentReply: currentReply
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
