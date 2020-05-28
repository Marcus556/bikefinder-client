import React, { Component } from 'react';
import axios from 'axios';
import SendMessage from './SendMessage'
import ShowSingleAd from './ShowSingleAd';


class AllMessages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      showSendMessage: false,
      key: '',
      warningMsg: 'You need to login first',
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
    if (this.state.accessToken) {
      this.renderMessages();
    }
  }

  renderMessages() {
    axios.get(this.props.apiUrl, this.state.accessTokenConfig)
      .then(res => {
        console.log(res.data)
        const messages = res.data;
        this.setState({ messages });
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.status);
          if (error.response.status === 403) {
          }
        }
      })
  }
  toggleShowSendMsg(key) {
    if (!this.state.showSendMessage) {
      this.setState({
        showSendMessage: true,
        key: key
      })
    } else {
      this.setState({
        showSendMessage: false,
        key: ''
      })
    }
  }


  render() {
    let messages = this.state.messages.map((item, key) =>
      <ul key={Math.random().toString(36).substring(7)} className="messageList">
        <li><h3 className="messageTitle">{item.title}</h3></li>
        <li>{item.message}</li>
        <li className="messageSignature">from: {item.from}</li>
        {this.state.showSendMessage && this.state.key == key ? <SendMessage recipient={item.from} title={item.title}></SendMessage> : null}
        <button
          className="sortingButton"
          onClick={this.toggleShowSendMsg.bind(this, key)}
          style={this.state.showSendMessage && this.state.key == key ? { backgroundColor: "#A01C16" } : { backgroundColor: '' }}>
          {this.state.showSendMessage && this.state.key == key ? 'Close' : 'Answer message'}
        </button>
      </ul>
    );
    return (
      <div className="container">
        <div className="logo"><img src={this.props.logo}></img></div>
        <div className="title">Mc Marknaden</div>
        <div className="sub-title">Your messages:</div>

        {!this.state.accessToken ? <div className="sub-title">{this.state.warningMsg}</div> : ''}
        <div className="messages">
          {messages}
        </div>
      </div>


    )

  }
}



export default AllMessages;

