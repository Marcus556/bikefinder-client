import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios'
import { withRouter } from "react-router-dom";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newMsg: false,
      isAdmin: localStorage.getItem('isAdmin'),
      loggedIn: localStorage.getItem('loggedIn')
    }

  }
  componentDidMount() {
    if (localStorage.getItem('accessToken')) this.checkForNewMessages()
    console.log(this.state.loggedIn)
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ loggedIn: nextProps.loggedIn });
  }



  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('loggedIn');

    this.setState({ isAdmin: false })
    this.setState({ loggedIn: false })
    this.props.toggleLoggedIn('logout')
    this.props.history.push('/login')
    console.log(this.state.loggedIn)

  }

  newMsgStyle = {
    position: 'relative',
    bottom: '55%',
    left: '97%',
    width: '7px',
    height: '7px',
    backgroundColor: 'red',
    borderRadius: '50%',
  }

  setNewMsgToFalse() {
    this.setState({ newMsg: false })
  }

  checkForNewMessages() {

    setInterval(() => {
      if (localStorage.getItem('accessToken')) {
        axios.get(this.props.apiUrl, this.props.accessTokenConfig)
          .then(res => {
            if (res.data.newMessages) this.setState({ newMsg: true })
          })
          .catch(function (error) {
            if (error.response) {
              console.log(error.response.status);
            }
          })
      }
    }, 60000);
  }


  render() {
    return (
      <div>
        <div className='navBar'>
          <h3 className="logoText">Bike Finder</h3>
          <ul>
            {this.state.loggedIn ? <li><Link className="nav-link" to="/">Ads</Link></li> : null}
            {this.state.loggedIn ? <li><Link className="nav-link" to="/add">Register ad</Link></li> : null}
            {this.state.loggedIn ? <li><Link className="nav-link" to="/yourads">Your ads</Link></li> : null}
            {this.state.loggedIn ? <li><Link className="nav-link" to="/messages" onClick={this.setNewMsgToFalse.bind(this)}>Messages</Link>{this.state.newMsg ? <div style={this.newMsgStyle}></div> : null}</li> : null}
            {this.state.loggedIn ? <li onClick={this.logout.bind(this)}><Link className="nav-link" to="/">Logout</Link></li> : null}
          </ul>
        </div>
        {this.state.isAdmin ?
          <div className='navBarAdmin'>
            <h5 className="logoText">Admin Area</h5>
            <ul>
              <li><Link className="nav-link" to="/login">User list</Link></li>
            </ul>
          </div>
          : null
        }
      </div>
    );
  }
}

NavBar.propTypes = {

};

export default withRouter(NavBar);
