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

  deletePrompt = (id) => {
    fetch(`/prompts/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
      .then(data => {
        this.props.handleView('index')
        this.setState(prevState => {
          const prompts = prevState.prompts.filter(prompt => prompt.id !== id)
          return {prompts}
        })
      })
      .catch(err => console.log(err))
  }

  componentDidMount() {
    this.fetchPrompts()
  }

  render(){
    return (
      <main>
        {this.props.currentPrompt.title
          ? <Show
            prompt={this.props.currentPrompt}
            deletePrompt={this.deletePrompt} />
          : this.props.view === 'index'
            ? this.state.prompts.map(prompt =>
              <Prompt
                prompt={prompt}
                key={prompt.id}
                handleView={this.props.handleView} />)
            : <Form addPrompt={this.addPrompt} className="new-prompt" />
        }
      </main>
    )
  }
}

export default Main
