import React, {Component} from 'react'

class Reply extends Component {
  constructor(){
    super()
    this.state = {
      title: '',
      body: '',
      prompt: null,
      user: null
    }
  }

  componentDidMount(){
    this.setState({
      title: this.props.reply.title,
      body: this.props.reply.body,
      prompt: {
        title: this.props.prompt.title,
        body: this.props.prompt.body,
        user: this.props.prompt.user,
        id: this.props.prompt.id
      },
      user: this.props.reply.user,
      id: this.props.reply.id
    })
  }
  render(){
    return (
      <div className="reply">
        <h4 onClick={() => {this.props.handleView('showReply', this.state)}}>
          {this.props.reply.title}
        </h4>

        <p className="text-muted byline">
          by {this.props.reply.user.username}
        </p>

        <p>
          {this.props.reply.body.slice(0, 500)}
          <span className="readmore">
            Read more
          </span>
        </p>

      </div>
    )
  }
}

export default Reply
