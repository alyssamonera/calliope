import React, { Component } from 'react'
import Modal from './Modal.js'

class Form extends Component {
  constructor(){
    super()
    this.state = {
      title: "",
      body: "",
      action: null,
      postType: null,
      prompt_id: null
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const state = await this.setState({
      user_id: this.props.viewOpts.currentUser.id
    })
    if (this.state.action === "Add") {
      if (this.state.postType === "prompt"){
        this.props.promptOpts.addPrompt(this.state)
      } else {
        console.log("adding reply...");
      }
    } else {
      if (this.state.postType === "prompt"){
        this.props.promptOpts.updatePrompt(this.state)
      } else {
        console.log("updating reply...");
      }
    }
  }

  preparePrompt = () => {
    let prompt = localStorage.getItem("currentPrompt")
    let parsedPrompt = JSON.parse(prompt)
    this.setState({
      promptTitle: parsedPrompt.title,
      promptBody: parsedPrompt.body,
      prompt_id: parsedPrompt.id
    })
  }

  prepareState = (currentPost) => {
    let post = localStorage.getItem(currentPost)
    let parsedPost = JSON.parse(post)
    this.setState({
      title: parsedPost.title,
      body: parsedPost.body,
      id: parsedPost.id
    })
  }

  componentDidMount() {
    let action
    let postType

    // ADD OR EDIT?
    if (window.location.href.includes("/new")){action = "Add"}
    else {action = "Edit"}

    // PROMPT OR REPLY?
    if (window.location.href.includes("prompt")){postType = "prompt"}
    else {postType = "reply"}

    this.setState({
      action: action,
      postType: postType
    })

    // PRESET VALUES
    if (postType === "reply"){
      if (action === "Add"){
        this.preparePrompt()
        return
      } else {
        this.prepareState("currentReply")
        return
      }
    } else {
      if (action === "Edit"){
        this.prepareState("currentPrompt")
        return
      }
    }

  }

  render(){
    return (
      <form onSubmit={this.handleSubmit} className="prompt-form">

        {this.state.postType === "reply"
          ?
          <div className="original-prompt">
            <h4>Original Prompt:</h4>
            <blockquote>
              {this.state.promptTitle}
              <br />
              {this.state.promptBody}
            </blockquote>
          </div>
          : ""
        }

        <h1>
          {this.state.action} your {this.state.postType}
        </h1>

        <label htmlFor="title">Title</label>
        <input type="text" placeholder="title" value={this.state.title} id="title" onChange={this.handleChange}/>

        <label htmlFor="body">Body</label>
        <textarea rows="10" cols="120" placeholder="body" value={this.state.body} id="body" onChange={this.handleChange} />

        <input type="submit" className="btn btn-dark" value="Submit" />

        {this.props.viewOpts.currentUser.id ? "" : <Modal handleView={this.props.viewOpts.handleView} />}

      </form>
    )
  }
}

export default Form
