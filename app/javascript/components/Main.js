import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './Home.js'
import Index from './prompt/PromptIndex.js'
import User from './profile/User.js'
import UserForm from './profile/UserForm.js'
import Form from './Form.js'
import LogIn from './auth/LogIn.js'
import SignUp from './auth/SignUp.js'
import Recover from './auth/Recover.js'
import Verify from './auth/Verify.js'
import ShowPrompt from './prompt/ShowPrompt.js'
import ShowReply from './reply/ShowReply.js'

class Main extends React.Component {
  constructor(){
    super()
    this.state = {
      prompts: [],
      quote: ""
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
      .then(data => data.json())
      .then(jData => {
        this.setState(prevState => {
          prevState.prompts.unshift(jData)
          return {prompts: prevState.prompts}
        })
      })
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
      .then(data => data.json())
      .then(jData => {
        this.setState(prevState => {
          let index = prevState.prompts.findIndex(eachPrompt => eachPrompt.id === prompt.id)
          prevState.prompts.splice(index, 1, jData)
          return {prompts: prevState.prompts}
        })
      })
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
      .then(data => {
        this.setState(prevState => {
          const prompts = prevState.prompts.filter(prompt => prompt.id !== id)
          return {prompts}
        })
      })
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
      .then(window.location.href=`/prompts/${reply.prompt_id}`)
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
      .then(alert("Please check your email for a verification link. (Don't forget to check the spam folder!)"))
  }

  updateUser = (user) => {
    fetch(`/api/users/${user.username}`, {
      body: JSON.stringify(user),
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
  }

  // ==============
  //   QUOTES API
  // ==============
  fetchQuote = () => {
    fetch("https://favqs.com/api/qotd")
      .then(data => data.json())
      .then(jData => {
        this.setState({
          quote: `"${jData.quote.body}" - ${jData.quote.author}`
        })
      })
  }

  // ==============
  //   LIFE CYCLE
  // ==============

  componentDidMount() {
    this.fetchPrompts()
    this.fetchQuote()
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

            {/* HOME */}
            <Route exact path="/" render={(props) =>
              <Home currentUser={this.props.currentUser} quote={this.state.quote} /> } />

            {/* BROWSE */}
            <Route exact path="/browse" render={(props) =>
              <Index
                prompts={this.state.prompts} currentUser={this.props.currentUser}
                deletePrompt={this.deletePrompt} {...props} />} />

            {/* ONE PROMPT */}
            <Route path="/prompts/:id" render={(props) =>
              <ShowPrompt currentUser={this.props.currentUser} deletePrompt={this.deletePrompt} {...props} />
              }/>

            {/* ONE REPLY */}
            <Route path="/replies/:id" render={(props) =>
              <ShowReply currentUser={this.props.currentUser} deleteReply={this.deleteReply} {...props} /> } />

            {/* ADD & EDIT FORM */}
            <Route path={["/new/prompt", "/edit/prompt/", "/new/reply", "/edit/reply"]} render={(props) =>
              <Form promptOpts={promptOpts} replyOpts={replyOpts} viewOpts={viewOpts} {...props} />} />

            {/* SIGN UP */}
            <Route exact path="/signup" render={(props) =>
              <SignUp addUser={this.addUser} {...props} />} />

            {/* LOGIN */}
            <Route exact path="/login" render={(props) =>
              <LogIn setAuth={this.props.setAuth} viewOpts={viewOpts}
                {...props} />} />

            {/* PASSWORD RECOVERY */}
            <Route exact path="/passrecovery" render={(props) =>
              <Recover {...props} /> } />

            {/* PASSWORD VERIFICATION */}
            <Route exact path="/passverification" render={(props) =>
              <Verify {...props} /> } />

            {/* PROFILE */}
            <Route path="/user/:username" render={(props) =>
              <User currentUser={this.props.currentUser} />} />

            {/* PROFILE UPDATE */}
            <Route path="/edit/user" render={(props) =>
              <UserForm updateUser={this.updateUser} {...props} /> } />

          </Switch>
        </div>
      </Router>
    )
  }
}

export default Main
