import React, { Component } from 'react'
import Modal from './Modal.js'

class Form extends Component {
  constructor(){
    super()
    this.state = {
      title: "",
      body: "",
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    if (this.props.viewOpts.view === "addPage") {
      this.props.promptOpts.addPrompt(this.state)
    } else {
      this.props.promptOpts.updatePrompt(this.state)
    }
  }

  componentDidMount() {
    this.setState({
      title: this.props.promptOpts.formInputs.title,
      body: this.props.promptOpts.formInputs.body,
      user_id: this.props.promptOpts.formInputs.user_id,
      id: this.props.promptOpts.formInputs.id
    })
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit} className="prompt-form">

        <h1>
          {this.props.viewOpts.view === "addPage"
            ? "Add a new prompt"
            : "Edit your prompt"}
        </h1>

        <label htmlFor="title">Title</label>
        <input type="text" placeholder="title" value={this.state.title} id="title" onChange={this.handleChange}/>

        <label htmlFor="body">Body</label>
        <textarea rows="10" cols="120" placeholder="body" value={this.state.body} id="body" onChange={this.handleChange} />

        <input type="submit" className="btn btn-dark" value={this.props.viewOpts.view === "addPage" ? "Add prompt" : "Submit edits"} />

        {this.props.viewOpts.currentUser.id ? "" : <Modal />}

      </form>
    )
  }
}

export default Form
