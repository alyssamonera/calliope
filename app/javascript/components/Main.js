import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './Home.js'
import Index from './PromptIndex.js'
import User from './User.js'
import Form from './Form.js'
import LogIn from './LogIn.js'
import SignUp from './SignUp.js'
import ShowPrompt from './ShowPrompt.js'
import ShowReply from './ShowReply.js'

class Main extends React.Component {
  constructor(){
    super()
    this.state = {
      prompts: []
    }
  }

  // ==============
  //    PROMPTS
  // ==============

  fetchPrompts = () => {
    fetch('/api/prompts')
      .then(data => data.json())
      .then(jData => {
        this.setState({prompts: jData})
      })
  }

  addPrompt = (prompt) => {
    fetch('/api/prompts', {
      body: JSON.stringify(prompt),
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
      .then(data => {window.location.href="/browse"})
  }

  updatePrompt = (prompt) => {
    fetch(`/api/prompts/${prompt.id}`, {
      body: JSON.stringify(prompt),
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
      .then(data => {window.location.href="/browse"})
      .catch(err => console.log(err))
  }

  deletePrompt = (id) => {
    fetch(`/api/prompts/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
      .then(data => {window.location.href="/browse"})
      .catch(err => console.log(err))
  }

  // ==============
  //    REPLIES
  // ==============

  addReply = (reply) => {
    fetch('/api/replies', {
      body: JSON.stringify(reply),
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
      .then(window.location.href = `/prompts/${reply.prompt_id}`)
      .catch(err => console.log(err))
  }

  updateReply = (reply) => {
    fetch(`/api/replies/${reply.id}`, {
      body: JSON.stringify(reply),
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
      .then(window.location.href=`/prompts/${reply.prompt_id}`)
      .catch(err => console.log(err))
  }

  deleteReply = (reply) => {
    fetch(`/api/replies/${reply.id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
      .then(window.location.href=`/prompts/${reply.prompt.id}`)
      .catch(err => console.log(err))
  }


  // ==============
  //     USERS
  // ==============

  addUser = (user) => {
    fetch('/api/signup', {
      body: JSON.stringify(user),
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
      .then(createdUser => {return createdUser.json()})
      .then(jsonedUser => {
        alert("Please check your email for a verification link. (Don't forget to check the spam folder!)")
      })
  }

  // ==============
  //   LIFE CYCLE
  // ==============

  componentDidMount() {
    this.fetchPrompts()
  }

  // ==============
  //    RENDER
  // ==============

  render(){
    const promptOpts = {
      addPrompt: this.addPrompt,
      updatePrompt: this.updatePrompt,
      formInputs: this.props.formInputs
    }
    const replyOpts = {
      addReply: this.addReply,
      updateReply: this.updateReply
    }
    const viewOpts = {
      view: this.props.view,
      currentUser: this.props.currentUser,
    }

    return (
      <Router>
        <div>
          <Switch>

            <Route exact path="/" render={(props) =>
              <Home currentUser={this.props.currentUser} /> } />

            <Route exact path="/browse" render={(props) =>
              <Index
                prompts={this.state.prompts} currentUser={this.props.currentUser}
                deletePrompt={this.deletePrompt} {...props} />} />

            <Route path={["/new/prompt", "/edit/prompt/", "/new/reply", "/edit/reply"]} render={(props) =>
              <Form promptOpts={promptOpts} replyOpts={replyOpts} viewOpts={viewOpts}
                {...props} />} />

            <Route exact path="/signup" render={(props) =>
              <SignUp addUser={this.addUser} {...props} />} />

            <Route exact path="/login" render={(props) =>
              <LogIn setAuth={this.props.setAuth} viewOpts={viewOpts}
                {...props} />} />

            <Route path="/user/:username" render={(props) =>
              <User currentUser={this.props.currentUser} />} />

            <Route path="/prompts/:id" render={(props) =>
              <ShowPrompt currentUser={this.props.currentUser} deletePrompt={this.deletePrompt} {...props} />
              }/>

            <Route path="/replies/:id" render={(props) =>
              <ShowReply currentUser={this.props.currentUser} deleteReply={this.deleteReply} {...props} /> } />

          </Switch>
        </div>
      </Router>
    )
  }
}

export default Main
