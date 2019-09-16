import React, {Component} from 'react'
import Reply from './Reply'
import ShowReply from './ShowReply'

class ReplyIndex extends Component {
  constructor(){
    super()
    this.state = {
      currentReply: {
        title: null,
        body: null,
        user: null
      }
    }
  }

  showReply = (id) => {
    let index = this.props.prompt.replies.findIndex(reply => reply.id === id)
    let reply = this.props.prompt.replies[index]
    this.setState({
      currentReply: {
        title: reply.title,
        body: reply.title,
        user: reply.user,
        id: reply.id
      }
    })
  }

  backToIndex = () => {
    this.setState({
      currentReply: {
        title: null,
        body: null,
        user: null,
        replies: [],
        id: null
      }
    })
  }

  render (){
    return (
      <div className="prompt-responses">
        {this.state.currentReply.title
          ? <ShowReply reply={this.state.currentReply} currentUser={this.props.currentUser} backToIndex={this.backToIndex} />
          : this.props.prompt.replies.map(reply =>
            <Reply
              key={reply.id}
              reply={reply}
              prompt={this.props.prompt}
              showReply={this.showReply} />)
        }
      </div>
    )
  }
}

export default ReplyIndex
