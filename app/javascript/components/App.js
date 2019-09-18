import React from 'react'
import Main from './Main.js'
import Header from './partials/Header.js'
import Footer from './partials/Footer.js'
import {Auth} from 'aws-amplify'

class App extends React.Component{
  constructor(){
    super()
    this.state = {
      isAuthenticating: true,
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
        avatar: null,
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
    this.props.history.push(`/${view}`)
  }

  // ===============
  // AUTHENTICATION
  // ===============
  setAuth = (authenticated, user) => {
    if (authenticated){
      fetch(`/api/login/${user.username}`)
        .then(data => data.json())
        .then(jData => {
          console.log(jData);
          this.setState({
            currentUser: {
              user: user,
              isAuthenticated: authenticated,
              avatar: jData.avatar,
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

  // ===============
  //   LIFE CYCLE
  // ===============
  async componentDidMount (){
    try {
      const session = await Auth.currentSession()
      const user = await Auth.currentAuthenticatedUser()
      this.setAuth(true, user)
    } catch (error) {
      this.setAuth(false, null)
    }
    this.setState({isAuthenticating: false})
  }

  render(){
    return (
      !this.state.isAuthenticating &&
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
        <Footer />
      </div>
    )
  }
}

export default App
