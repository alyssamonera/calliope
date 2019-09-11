import React, { Component } from 'react'

class Form extends Component {
  constructor(){
    super()
    this.state = {
      title: "",
      body: "",
      user_id: 1
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  render(){
    return (
      <form>

        <label htmlFor="title">Title</label>
        <input type="text" placeholder="title" value={this.state.title} id="title" onChange={this.handleChange}/>

        <label htmlFor="body">Body</label>
        <input type="text" placeholder="body" value={this.state.body} id="body" onChange={this.handleChange}/>

        <label htmlFor="user_id">User ID (temporary)</label>
        <input type="number" placeholder="user id" value={this.state.user_id} id="user_id" onChange={this.handleChange}/>

        <input type="submit" value="Add prompt" />

      </form>
    )
  }
}

export default Form
