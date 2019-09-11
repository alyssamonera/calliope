import React from 'react'
import Form from './Form.js'
import Prompt from './Prompt.js'
import Show from './Show.js'

class Main extends React.Component {
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
        this.props.handleView('index')
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
      <main>
        {this.props.currentPrompt.title
          ? <Show prompt={this.props.currentPrompt} />
          : this.props.view === 'index'
            ? this.state.prompts.map(prompt => <Prompt prompt={prompt} key={prompt.id} handleView={this.props.handleView} />)
            : <Form addPrompt={this.addPrompt} className="new-prompt" />
        }
      </main>
    )
  }
}

export default Main
