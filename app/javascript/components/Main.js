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
    fetch('/prompts')
      .then(data => data.json())
      .then(jData => {
        this.setState({prompts: jData})
      })
  }

  addPrompt = (prompt) => {
    fetch('/prompts', {
      body: JSON.stringify(prompt),
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
      .then(createdPrompt => {return createdPrompt.json()})
      .then(jsonedPrompt => {
        this.setState(prevState => {
          prevState.prompts.unshift(jsonedPrompt)
          return {prompts: prevState.prompts}
        })
      })
  }

  updatePrompt = (prompt) => {
    fetch(`/prompts/${prompt.id}`, {
      body: JSON.stringify(prompt),
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
      .then(updatedPrompt => {return updatedPrompt.json()})
      .then(jsonedPrompt => {
        this.setState(prevState => {
          let index = prevState.prompts.findIndex(eachPrompt => eachPrompt.id === prompt.id)
          prevState.prompts.splice(index, 1, jsonedPrompt)
          return {prompts: prevState.prompts}
        })
      })
      .catch(err => console.log(err))
  }

  deletePrompt = (id) => {
    fetch(`/prompts/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
      .then(data => {
        this.setState(prevState => {
          const prompts = prevState.prompts.filter(prompt => prompt.id !== id)
          return {prompts}
        })
      })
      .catch(err => console.log(err))
  }

  // ==============
  //     USERS
  // ==============

  addUser = (user) => {
    fetch('/signup', {
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
            <Route exact path="/" render={() => <Index
              prompts={this.state.prompts} />} />
            <Route exact path="/new/prompt" render={() => <Form promptOpts={promptOpts} viewOpts={viewOpts} />} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default Main
