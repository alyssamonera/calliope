import React, {Component} from 'react'

class ShowReply extends Component {
  constructor(){
    super()
    this.state = {
      reply: {
        title: null,
        body: null,
        id: null,
        prompt: {
          title: null,
          body: null,
          id: null
        },
        user: {
          username: null,
          id: null
        }
      }
    }
  }


  componentDidMount(){
    fetch(`/api/replies/${this.props.match.params.id}`)
      .then(data => data.json())
      .then(jsonedData => {
        this.setState({
          reply: {
            title: jsonedData.title,
            body: jsonedData.body,
            id: parseInt(jsonedData.id),
            prompt: jsonedData.prompt,
            user: jsonedData.user
          }
        })
      })
  }

  render(){
    return (
      <div className="reply">
        <h4>{this.state.reply.title}</h4>
        <a href="#" className="text-muted byline">
          {this.state.reply.user.username}
        </a>

        <p>
          {this.state.reply.body}
        </p>
      </div>
    )
  }
}

export default ShowReply
