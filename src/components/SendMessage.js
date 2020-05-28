import React, { Component } from 'react';
import axios from 'axios'


class SendMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showWarning: false,
      warningMsg: '',
      title: '',
      message: '',
      username: '',
      recipient: '',
      accessToken: localStorage.getItem('accessToken'),
      accessTokenConfig: {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
      }

    }
  }
  static defaultProps = {
    logo: 'logo'
  };


  componentDidMount() {

  }

  handleChange = e => {
    console.log(e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  sendMessage = () => {
    const { title, message, username, recipient } = this.state
    if (message === '') {
      this.setState({
        showWarning: true,
        warningMsg: 'Please fill out the entire form!'
      })
      return
    }
    const messageObj = {
      title: this.props.title,
      message: message,
      recipient: this.props.recipient
    }
    console.log(messageObj)

    axios.post('http://localhost:5000/users/messages', messageObj, this.state.accessTokenConfig)
      .then((res) => {
        console.log(res.data)
        if (res.status === 500) {
          console.log('500 test funkar')
        }
      }).catch((error) => {
        console.log(error)
      });
    this.setState({
      title: '',
      message: '',
      recipient: ''
    })

  }




  render() {
    if (this.props.hide) return null;
    return (
      <div className="formGroup">
        <label htmlFor="message">Message:</label>
        <textarea
          name="message"
          value={this.state.message}
          onChange={this.handleChange}>
        </textarea>
        {this.state.showWarning ? <span className="warningMsg">{this.state.warningMsg}</span> : ''}
        <button onClick={this.sendMessage}>Send Message</button>

      </div>
    )
  }
}



export default SendMessage;

