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

  updatePrompt = (prompt) => {
    fetch(`/prompts/${prompt.id}`, {
      body: JSON.stringify(prompt),
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
      .then(updatedPrompt => {
        this.props.handleView('index')
        this.setState(prevState => {
          let index = prevState.prompts.findIndex(eachPrompt => eachPrompt.id === prompt.id)
          prevState.prompts.splice(index, 1, prompt)
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
      <main className={this.props.view === 'index' ? "prompt-index" : ""}>
        {this.props.currentPrompt.title
          ? <Show
            prompt={this.props.currentPrompt}
            deletePrompt={this.deletePrompt}
            handleView={this.props.handleView} />
          : this.props.view === 'index'
            ? <div>
                <h3> Prompts </h3>
                {this.state.prompts.map(prompt =>
                <Prompt
                  prompt={prompt}
                  key={prompt.id}
                  handleView={this.props.handleView} />)}
              </div>
            : <Form
                addPrompt={this.addPrompt}
                updatePrompt={this.updatePrompt}
                className="new-prompt"
                formInputs={this.props.formInputs}
                view={this.props.view} />
        }
      </main>
    )
  }
}

export default Main
