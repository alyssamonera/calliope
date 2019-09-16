import React, {Component} from 'react'

class ShowReply extends Component {
  render(){
    return (
      <div>
        {this.props.reply.title}
      </div>
    )
  }
}

export default ShowReply
