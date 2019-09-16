import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Index from './PromptIndex.js'
import Form from './Form.js'
import Prompt from './Prompt.js'
import Show from './ShowPrompt.js'
import LogIn from './LogIn.js'
import SignUp from './SignUp.js'

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
      .then(window.location.href="/")
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
      .then(window.location.href="/")
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
      .then(window.location.href="/")
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
    const viewOpts = {
      view: this.props.view,
      currentUser: this.props.currentUser,
    }

    return (
      <Router>
        <div>
          <Switch>

            <Route exact path="/" render={(props) =>
              <Index
                prompts={this.state.prompts} currentUser={this.props.currentUser}
                deletePrompt={this.deletePrompt} {...props} />} />

            <Route path={["/new/prompt", "/edit/prompt", "/new/reply", "/edit/reply"]} render={(props) =>
              <Form promptOpts={promptOpts} viewOpts={viewOpts}
                {...props} />} />

            <Route exact path="/login" render={(props) =>
              <LogIn setAuth={this.props.setAuth} viewOpts={viewOpts}
                {...props} />} />

          </Switch>
        </div>
      </Router>
    )
  }
}

export default Main
