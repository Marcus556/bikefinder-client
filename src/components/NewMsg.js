import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NewMsg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newMsgStyle: {
        position: 'relative',
        bottom: '60%',
        left: '97%',
        width: '7px',
        height: '7px',
        backgroundColor: 'red',
        borderRadius: '50%',
      },
      newMessages: false,
    }

  }


  componentDidMount() {
  }
  test() {
    this.setState({ newMessages: true })
  }




  render() {
    return (
      <div>
        <button onClick={this.test.bind(this)}>asd</button>
        {this.state.newMessages ? <div style={this.state.newMsgStyle}></div> : ''}


      </div>
    );
  }
}

NewMsg.propTypes = {

};

export default NewMsg;