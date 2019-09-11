import React from 'react'
import Form from './Form.js'

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      prompts: []
    }
  }

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

  componentDidMount() {
    this.fetchPrompts()
  }

  render(){
    return (
      <div>
        <ul>
          {this.state.prompts.map(prompt => <li key={prompt.id}>{prompt.title}</li>)}
        </ul>
        <Form addPrompt={this.addPrompt} />
      </div>
    )
  }
}

export default App
