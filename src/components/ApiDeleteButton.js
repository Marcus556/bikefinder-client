import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from "react-router-dom";

export class ApiDeleteButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showConfirmationBox: false,
      accessToken: localStorage.getItem('accessToken'),
      accessTokenConfig: {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
      }
    }
  }


  test() {
    { !this.state.showConfirmationBox ? this.setState({ showConfirmationBox: true }) : this.setState({ showConfirmationBox: false }) }
  }
  async yes() {
    let res = await axios.delete(this.props.deleteUrl, this.state.accessTokenConfig);
    if (res.status === 200) {
      this.setState({ showConfirmationBox: false })
      this.props.history.push(this.props.route);
      console.log('yes')
    }
  }
  no() {
    this.setState({ showConfirmationBox: false })
    console.log('no')
  }


  render() {
    const buttonStyle = {
      backgroundColor: 'rgb(160,28,22)',
      color: 'white',
      width: '130px',
      height: '25px',
      borderRadius: '30px',
      fontSize: '.9rem',
      fontWeight: '700',
      textAlign: 'center',
      boxShadow: '3px 3px 8px #b1b1b1, -3px -3px 8px #ffffff',
    };


    const confirmationBoxStyle = {
      display: 'inline',
      position: 'absolute',
      color: 'rgb(46, 47, 49)',
      border: 'solid 1px rgb(185, 181, 181)',
      padding: '1rem',
      marginTop: '.5rem',
      backgroundColor: 'white',
      borderRadius: '.7rem'
    }

    const optionStyles = {
      listStyle: 'none',
      display: 'flex',
      justifyContent: 'space-around'
    }
    const optionButtonStyles = {
      cursor: 'pointer'
    }





    return (
      <div>
        <button onClick={this.test.bind(this)}
          style={buttonStyle}
        >{this.props.size == 'sm' ? 'x' : 'Delete'}</button><br />
        {this.state.showConfirmationBox ? (
          <div className="confirmationBox" style={confirmationBoxStyle}>
            Are you sure you wanna delete this?
            <div>
              <ul style={optionStyles}>
                <li onClick={this.yes.bind(this)} style={optionButtonStyles}>
                  YES
              </li>
                <li onClick={this.no.bind(this)} style={optionButtonStyles}>
                  NO
              </li>
              </ul>
            </div>
          </div>
        ) : null}

      </div>
    )
  }
}

export default withRouter(ApiDeleteButton)

