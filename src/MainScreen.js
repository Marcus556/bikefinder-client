import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import logo from './img/bikefinderlogo.png'
import AdList from './components/AdList';
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import NavBar from './components/NavBar'
import AddAd from './components/AddAd'
import OwnedAds from './components/OwnedAds'
import ShowSingleAd from './components/ShowSingleAd'
import TestAdList from './components/TestAdList'
import AllMessages from './components/AllMessages'
import SendMessage from './components/SendMessage'
import ApiDeleteButton from './components/ApiDeleteButton'

class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessTokenConfig: {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
      },
      loggedIn: false,
    }
    this.toggleLoggedIn = this.toggleLoggedIn.bind(this)
  }

  toggleLoggedIn(action) {
    if (action === 'logout') this.setState({ loggedIn: false })
    !this.state.loggedIn ? this.setState({ loggedIn: true }) : this.setState({ loggedIn: false })
    console.log('cl')
    console.log(this.state.loggedIn)
  }
  render() {
    return (
      <Router>
        <header className="App-header">
          {this.state.loggedIn ? <NavBar accessTokenConfig={this.state.accessTokenConfig} apiUrl='http://localhost:5000/users/user' loggedIn={this.state.loggedIn} toggleLoggedIn={this.toggleLoggedIn}></NavBar> : <NavBar accessTokenConfig={this.state.accessTokenConfig} apiUrl='http://localhost:5000/users/user' loggedIn={this.state.loggedIn}></NavBar>}
        </header>

        <div>
          <Route exact path="/">
            <AdList logo={logo} apiUrl='http://localhost:5000/api/ads'></AdList>
          </Route>
          <Switch>
            <Route exact path="/add">
              <AddAd logo={logo}></AddAd>
            </Route>
            <Route exact path="/yourads">
              <AdList logo={logo} apiUrl='http://localhost:5000/api/ads/owned'></AdList>
            </Route>
            <Route exact path="/singlead">
              <ShowSingleAd logo={logo}></ShowSingleAd>
            </Route>
            <Route exact path="/singlead/:userid">
              <ShowSingleAd logo={logo}></ShowSingleAd>
            </Route>
            <Route exact path="/login">
              <LoginForm logo={logo} toggleLoggedIn={this.toggleLoggedIn.bind(this)}></LoginForm>
            </Route>
            <Route exact path="/register">
              <RegisterForm logo={logo}></RegisterForm>
            </Route>
            <Route exact path="/messages">
              <AllMessages logo={logo} apiUrl='http://localhost:5000/users/messages'></AllMessages>
            </Route>
            <Route exact path="/sendmessage">
              <SendMessage logo={logo}></SendMessage>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

MainScreen.propTypes = {

};

export default MainScreen;

