import React, {Component} from 'react'
import Prompt from './Prompt.js'
import ShowPrompt from './ShowPrompt.js'

class Index extends Component {
  constructor(){
    super()
    this.state = {
      currentPrompt: {
        title: null,
        body: null,
        user: null,
        replies: []
      }
    }
  }

  showPrompt = (id) => {
    let index = this.props.prompts.findIndex(prompt => prompt.id === id)
    this.setState({
      currentPrompt: {
        title: this.props.prompts[index].title,
        body: this.props.prompts[index].body,
        user: this.props.prompts[index].user,
        replies: this.props.prompts[index].replies,
        id: this.props.prompts[index].id
      }
    })
  }

  backToIndex = () => {
    this.setState({
      currentPrompt: {
        title: null,
        body: null,
        user: null,
        replies: [],
        id: null
      }
    })
  }

  render(){
    return (
      <main className="prompt-index">
        {this.state.currentPrompt.title
          ? <ShowPrompt prompt={this.state.currentPrompt} currentUser={this.props.currentUser} backToIndex={this.backToIndex} deletePrompt={this.props.deletePrompt} />
          : this.props.prompts.map(prompt =>
            <Prompt key={prompt.id} prompt={prompt} id={prompt.id} showPrompt={this.showPrompt} />)}
      </main>
    )
  }
}

export default Index
