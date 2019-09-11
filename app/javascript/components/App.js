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
      }
    }
  }

  handleView = (view, prompt) => {
    let formInputs = {
      title: '',
      body: '',
      user_id: null,
      id: null
    }
    let currentPrompt = {
      title: '',
      body: '',
      user_id: null,
      id: null
    }
    this.setState({
      view: view,
      formInputs: formInputs,
      currentPrompt: currentPrompt
    })
  }

  render(){
    return (
      <div>
        <Header handleView={this.handleView} />
        <Main view={this.state.view} />
      </div>
    )
  }
}

export default App
