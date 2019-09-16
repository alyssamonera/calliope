import React, {Component} from 'react'

class Reply extends Component {
  render(){
    return (
      <div className="reply">
        <h4>
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
