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
    if (this.props.view === "addPage") {
      this.props.addPrompt(this.state)
    } else {
      this.props.updatePrompt(this.state)
    }
  }

  componentDidMount() {
    this.setState({
      title: this.props.formInputs.title,
      body: this.props.formInputs.body,
      user_id: this.props.formInputs.user_id,
      id: this.props.formInputs.id
    })
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit} className="prompt-form">

        <h1>
          {this.props.view === "addPage"
            ? "Add a new prompt"
            : "Edit your prompt"}
        </h1>

        <label htmlFor="title">Title</label>
        <input type="text" placeholder="title" value={this.state.title} id="title" onChange={this.handleChange}/>

        <label htmlFor="body">Body</label>
        <textarea rows="10" cols="120" placeholder="body" value={this.state.body} id="body" onChange={this.handleChange} />

        <input type="submit" className="btn btn-dark" value={this.props.view === "addPage" ? "Add prompt" : "Submit edits"} />

        {this.props.currentUser.id ? "" : <Modal handleView={this.props.handleView} />}

      </form>
    )
  }
}

export default Form
