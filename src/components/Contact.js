import React, { Component } from 'react';
import axios from 'axios';

class Contact extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      message: '',
      messageSent: false,
    }
  }

  handleNameInput(e) {
    this.setState({ name: e.target.value })
  }

  handleEmailInput(e) {
    this.setState({ email: e.target.value })
  }

  handleMessageInput(e) {
    this.setState({ message: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log('SUBMITTED', this.state)

    const { name, email, message } = this.state

    // Call Lambda Function
    axios.post('/.netlify/functions/mailer', {
        name: name,
        email: email,
        message: message
    }).then(response => {
        console.log(response);
        this.setState({ messageSent: true })
    }).catch(error => {
        console.log(error);
    });

    // On Successful Submit
  }

  render() {
    const { name, email, message, messageSent } = this.state
    return (
      <React.Fragment>
        <h2 className="major">Contact</h2>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="field half first">
            <label htmlFor="name">Name</label>
            <input
              onChange={this.handleNameInput.bind(this)}
              value={name}
              type="text"
              name="name"
              id="name"
            />
          </div>
          <div className="field half">
            <label htmlFor="email">Email</label>
            <input
              onChange={this.handleEmailInput.bind(this)}
              value={email}
              type="text"
              name="email"
              id="email"
            />
          </div>
          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea
              onChange={this.handleMessageInput.bind(this)}
              value={message}
              name="message"
              id="message"
              rows="4"
            />
          </div>
          {messageSent ? (
            <h3>Message Sent!</h3>
          ) : (
            <ul className="actions">
              <li>
                <input type="submit" value="Send Message" className="special" />
              </li>
              <li>
                <input type="reset" value="Reset" />
              </li>
            </ul>
          )}
        </form>
        <ul className="icons">
          <li>
            <a href="#" className="icon fa-twitter">
              <span className="label">Twitter</span>
            </a>
          </li>
          <li>
            <a href="#" className="icon fa-facebook">
              <span className="label">Facebook</span>
            </a>
          </li>
          <li>
            <a href="#" className="icon fa-instagram">
              <span className="label">Instagram</span>
            </a>
          </li>
          <li>
            <a href="#" className="icon fa-github">
              <span className="label">GitHub</span>
            </a>
          </li>
        </ul>
      </React.Fragment>
    )
  }
}

export default Contact
