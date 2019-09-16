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

  render(){
    return (
      <main className="prompt-index">
        {this.props.prompts.map(prompt =>
            <Prompt key={prompt.id} prompt={prompt} id={prompt.id} showPrompt={this.showPrompt} />)}
      </main>
    )
  }
}

export default Index
