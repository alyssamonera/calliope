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

  componentDidMount() {
    let action
    let postType
    let title = ""
    let body = ""
    let id = null
    let prompt_id = null
    // ADD OR EDIT?
    if (window.location.href.includes("/new")){
      action = "Add"
    } else {
      action = "Edit"
      let post = localStorage.getItem("currentPost")
      let parsedPost = JSON.parse(post)
      title = parsedPost.title
      body = parsedPost.body
      id = parsedPost.id
    }
    // PROMPT OR REPLY?
    if (window.location.href.includes("prompt")){
      postType = "prompt"
    } else {postType = "reply"}
    this.setState({
      action: action,
      postType: postType,
      title: title,
      body: body,
      id: id
    })
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit} className="prompt-form">

        <h1>
          {this.state.action} your {this.state.postType}
        </h1>

        <label htmlFor="title">Title</label>
        <input type="text" placeholder="title" value={this.state.title} id="title" onChange={this.handleChange}/>

        <label htmlFor="body">Body</label>
        <textarea rows="10" cols="120" placeholder="body" value={this.state.body} id="body" onChange={this.handleChange} />

        <input type="submit" className="btn btn-dark" value={this.state.action === "Add" ? "Add prompt" : "Submit edits"} />

        {this.props.viewOpts.currentUser.id ? "" : <Modal handleView={this.props.viewOpts.handleView} />}

      </form>
    )
  }
}

export default Form
