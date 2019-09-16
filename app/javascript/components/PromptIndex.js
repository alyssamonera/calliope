import React, {Component} from 'react'
import Prompt from './Prompt.js'

class Index extends Component {
  render(){
    return (
      <main className="prompt-index">
        {this.props.prompts.map(prompt =>
          <Prompt key={prompt.id} prompt={prompt} />)}
      </main>
    )
  }
}

export default Index